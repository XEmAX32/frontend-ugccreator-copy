
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Eye, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PageContainer from "@/components/layout/PageContainer";
import StoryboardSection from "@/components/create-video/StoryboardSection";
import ScriptEditor from "@/components/create-video/ScriptEditor";
import VideoPreview from "@/components/create-video/VideoPreview";
import { VideoClip, VideoProject } from "@/types/video";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const promptExamples = [
  "Create a 30-second video explaining why effective time management is crucial for entrepreneurs.",
  "I need a concise explanation of how blockchain technology works for beginners.",
  "Generate a video introducing my new fitness app with energetic and motivational tone.",
  "Create a professional welcome message for my company website highlighting our core values."
];

const CreateVideo = () => {
  const [promptText, setPromptText] = useState("");
  const [showExamples, setShowExamples] = useState(false);
  const [activeClipId, setActiveClipId] = useState<string | null>(null);
  const [clips, setClips] = useState<VideoClip[]>([
    {
      id: "1",
      thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23333'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' fill='white' text-anchor='middle' dominant-baseline='middle'%3EClip 1%3C/text%3E%3C/svg%3E",
      text: "Have you ever wondered why the advice on scaling your startup sometimes backfires?",
      durationSeconds: 5
    }
  ]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [downloadAfterSave, setDownloadAfterSave] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalDuration = clips.reduce((sum, clip) => sum + clip.durationSeconds, 0);
  const maxDuration = 20; // 20 seconds total
  const remainingDuration = maxDuration - totalDuration;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (remainingDuration <= 0) {
      toast({
        title: "Maximum duration reached",
        description: "You've reached the 20-second limit for your video.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would process the prompt here
    console.log("Submitting prompt:", promptText);
    const newClip: VideoClip = {
      id: String(Date.now()),
      thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23333'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' fill='white' text-anchor='middle' dominant-baseline='middle'%3ENew Clip%3C/text%3E%3C/svg%3E",
      text: promptText,
      durationSeconds: 5 // Default duration for new clips
    };
    
    setClips([...clips, newClip]);
    setActiveClipId(newClip.id);
    setPromptText("");
    toast({
      title: "Clip generated",
      description: "New clip has been added to your storyboard."
    });
  };

  const insertExample = (example: string) => {
    setPromptText(example);
    setShowExamples(false);
  };

  const deleteClip = (id: string) => {
    setClips(clips.filter(clip => clip.id !== id));
    if (activeClipId === id) {
      setActiveClipId(clips[0]?.id || null);
    }
    toast({
      title: "Clip deleted",
      description: "The clip has been removed from your storyboard."
    });
  };

  const viewAllClips = () => {
    setShowVideoDialog(true);
    setActiveClipId(null);
    toast({
      title: "Viewing all clips",
      description: "Showing preview of the complete video."
    });
  };

  const handleAddNewClip = () => {
    setActiveClipId(null);
    setPromptText("");
  };

  const handleDownloadVideo = () => {
    // In a real app, this would trigger the video rendering and download
    toast({
      title: "Download started",
      description: "Your video is being prepared for download."
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download ready",
        description: "Your video has been downloaded."
      });
    }, 2000);
  };

  const handleFinishProject = () => {
    if (clips.length === 0) {
      toast({
        title: "No clips to save",
        description: "Please create at least one clip before finishing.",
        variant: "destructive"
      });
      return;
    }
    
    // Open the save dialog to get the project name
    setShowSaveDialog(true);
  };

  const handleSaveProject = () => {
    // Validate project title
    if (!projectTitle.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a name for your project.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new project object
    const newProject: VideoProject = {
      id: String(Date.now()),
      title: projectTitle.trim(),
      clips: [...clips],
      thumbnail: clips[0].thumbnail,
      createdAt: new Date().toISOString(),
      totalDuration
    };
    
    // Save to localStorage (in a real app, this would go to a database)
    const existingProjects = JSON.parse(localStorage.getItem('videoProjects') || '[]');
    const updatedProjects = [newProject, ...existingProjects];
    localStorage.setItem('videoProjects', JSON.stringify(updatedProjects));
    
    toast({
      title: "Project saved",
      description: "Your video project has been saved successfully."
    });
    
    // Download the video if the checkbox is checked
    if (downloadAfterSave) {
      handleDownloadVideo();
    }
    
    // Close dialog and navigate back to the home page
    setShowSaveDialog(false);
    navigate("/home");
  };

  const activeClipText = activeClipId 
    ? clips.find(c => c.id === activeClipId)?.text 
    : "";

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/avatar-selection")}
            className="mr-4"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">Create Your Video</h1>
          
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 bg-theme-black/40 px-3 py-1 rounded-full">
              <Clock size={16} className="text-theme-orange" />
              <span className="text-sm font-medium">
                {remainingDuration.toFixed(1)}s remaining of {maxDuration}s
              </span>
            </div>
            
            <Button
              onClick={viewAllClips}
              variant="outline"
              className="ml-2 text-xs bg-theme-black/40 border-theme-gray/30 hover:bg-theme-black/60"
            >
              <Eye size={16} className="mr-1" /> View Full Video
            </Button>
            
            <Button
              onClick={handleFinishProject}
              variant="default"
              className="ml-2 bg-theme-orange hover:bg-theme-orange-light"
            >
              <Save size={16} className="mr-1" /> Finish
            </Button>
          </div>
        </div>

        <StoryboardSection 
          clips={clips}
          activeClipId={activeClipId}
          totalDuration={totalDuration}
          maxDuration={maxDuration}
          remainingDuration={remainingDuration}
          onClipSelect={setActiveClipId}
          onClipDelete={deleteClip}
          onAddClip={handleAddNewClip}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ScriptEditor 
              activeClipId={activeClipId}
              promptText={promptText}
              promptExamples={promptExamples}
              showExamples={showExamples}
              remainingDuration={remainingDuration}
              onPromptChange={setPromptText}
              onExampleClick={insertExample}
              onToggleExamples={() => setShowExamples(!showExamples)}
              onSubmit={handleSubmit}
              clipText={activeClipText}
            />
          </div>

          <div className="relative">
            <VideoPreview 
              activeClipId={activeClipId}
              clips={clips}
              totalDuration={totalDuration}
              maxDuration={maxDuration}
              onDownload={handleDownloadVideo}
            />
          </div>
        </div>
      </div>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-md bg-theme-black border-theme-gray/40">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Save Your Project</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name" className="text-white">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="Enter a name for your project"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="bg-theme-black/80 border-theme-gray/40 text-white"
                  autoFocus
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="download-checkbox"
                  checked={downloadAfterSave}
                  onChange={(e) => setDownloadAfterSave(e.target.checked)}
                  className="h-4 w-4 rounded border-theme-gray/40 text-theme-orange focus:ring-theme-orange"
                />
                <Label htmlFor="download-checkbox" className="text-white text-sm">
                  Download video after saving
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSaveDialog(false)}
              className="bg-transparent border-theme-gray/40 text-white hover:bg-theme-black/60"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSaveProject}
              className="bg-theme-orange hover:bg-theme-orange-light text-white"
            >
              Save Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-[90vh] h-[90vh] bg-theme-black border-theme-gray/40 flex flex-col p-0">
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex items-center justify-center">
              <VideoPreview 
                activeClipId={null}
                clips={clips}
                totalDuration={totalDuration}
                maxDuration={maxDuration}
                isFullscreen={true}
              />
            </div>
          </div>
          
          <DialogFooter className="border-t border-theme-gray/20 p-4 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setShowVideoDialog(false)}
              className="bg-transparent border-theme-gray/40 text-white hover:bg-theme-black/60"
            >
              Close
            </Button>
            <Button
              onClick={handleFinishProject}
              className="bg-theme-orange hover:bg-theme-orange-light"
            >
              Finish Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default CreateVideo;
