import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Eye, Film, Hand, HelpCircle, Plus, Send, Trash, Video } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface VideoClip {
  id: string;
  thumbnail: string;
  text: string;
  durationSeconds: number;
}

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
    setActiveClipId(null);
    toast({
      title: "Viewing all clips",
      description: "Showing preview of the complete video."
    });
  };

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
          </div>
        </div>

        {/* Storyboard */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-white/80">Storyboard</h2>
            <div className="flex items-center gap-1">
              <Progress value={(totalDuration / maxDuration) * 100} className="w-32 h-2 bg-theme-gray/30" />
              <span className="text-xs text-white/60">{totalDuration.toFixed(1)}s / {maxDuration}s</span>
            </div>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-4 storyboard no-scrollbar" style={{ overflowX: 'auto', minHeight: '90px', paddingBottom: '8px' }}>
            {clips.map(clip => (
              <div 
                key={clip.id}
                className={`relative flex-shrink-0 cursor-pointer transition-all ${activeClipId === clip.id ? 'ring-2 ring-theme-orange scale-105' : 'hover:scale-102'}`}
                onClick={() => setActiveClipId(clip.id)}
              >
                <div className="w-24 h-16 relative overflow-hidden rounded-md bg-theme-black/60 border border-theme-gray/30">
                  <img src={clip.thumbnail} alt={`Clip ${clip.id}`} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] p-1 truncate">
                    {clip.text.substring(0, 20)}...
                  </div>
                  <div className="absolute top-1 right-1 bg-black/70 text-white text-[8px] px-1 rounded">
                    {clip.durationSeconds}s
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-5 w-5 bg-red-500/90 text-white rounded-full p-0 hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteClip(clip.id);
                  }}
                >
                  <Trash size={11} />
                </Button>
              </div>
            ))}

            {/* Add new clip button */}
            {remainingDuration > 0 && (
              <div 
                className="w-24 h-16 flex-shrink-0 border border-dashed border-theme-gray/40 rounded-md flex items-center justify-center cursor-pointer bg-theme-black/40 hover:bg-theme-black/60 transition-colors"
                onClick={() => {
                  setActiveClipId(null);
                  setPromptText("");
                }}
              >
                <div className="flex flex-col items-center">
                  <Plus size={18} className="text-theme-orange" />
                  <span className="text-[9px] text-white/70 mt-1">Add Clip</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Script Editor */}
          <div className="space-y-4">
            <Card className="border-theme-gray/40 bg-theme-black/80 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-white font-medium">
                  {activeClipId ? "Edit Clip Script" : "Write New Clip Script"}
                </h2>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowExamples(!showExamples)}
                      className="px-3 py-1 bg-theme-orange hover:bg-theme-orange-light text-white border-none rounded-md shadow-md flex items-center gap-2"
                    >
                      <Hand size={16} />
                      <span className="font-medium text-sm">Click me for help</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click for prompt examples</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              {showExamples && (
                <div className="mb-4 p-4 bg-theme-black/70 border border-theme-gray/30 rounded-md">
                  <h3 className="text-sm font-medium text-theme-orange mb-2">Prompt Examples:</h3>
                  <ul className="space-y-2">
                    {promptExamples.map((example, index) => (
                      <li key={index}>
                        <button 
                          onClick={() => insertExample(example)}
                          className="text-xs text-white/80 hover:text-theme-orange text-left w-full p-2 rounded hover:bg-theme-gray/20 transition-colors"
                        >
                          {example}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                <Textarea
                  placeholder={activeClipId 
                    ? "Edit the script for this clip..." 
                    : "Write the script for your new clip..."}
                  className="min-h-[300px] resize-none bg-transparent border-theme-gray-light/30 focus:border-theme-orange text-white"
                  value={promptText || (activeClipId ? clips.find(c => c.id === activeClipId)?.text || "" : "")}
                  onChange={(e) => setPromptText(e.target.value)}
                />
                
                <div className="flex justify-between mt-4">
                  {remainingDuration <= 0 && (
                    <div className="text-yellow-500 text-xs flex items-center">
                      <Clock size={14} className="mr-1" /> 
                      You've reached the maximum 20 seconds for your video
                    </div>
                  )}
                  <div className="ml-auto">
                    <Button 
                      type="submit"
                      className="bg-theme-orange hover:bg-theme-orange-light text-white flex items-center gap-2 px-6 py-2 font-medium"
                      disabled={!promptText.trim() || remainingDuration <= 0}
                    >
                      {activeClipId ? "Update Clip" : "Generate Clip"} <Film size={16} />
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>

          {/* Right Column - Video Preview */}
          <div className="relative">
            <Card className="border-theme-gray/40 bg-theme-black/50 rounded-lg overflow-hidden h-full min-h-[400px] flex flex-col">
              {/* Video Preview Area */}
              <div className="relative flex-1 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] overflow-hidden">
                {/* Avatar Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-black/80 px-3 py-1 rounded-full flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-theme-orange flex items-center justify-center">
                      <Video size={12} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-white">
                      {activeClipId ? `Clip ${clips.findIndex(c => c.id === activeClipId) + 1}` : "Full Video"}
                    </span>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center w-full px-8">
                    {activeClipId ? (
                      <h2 className="text-2xl font-bold">
                        <span className="text-white">{clips.find(c => c.id === activeClipId)?.text.split(' ').slice(0, 3).join(' ').toUpperCase()} </span>
                        <span className="text-theme-orange">{clips.find(c => c.id === activeClipId)?.text.split(' ').slice(3, 4).join(' ').toUpperCase()}</span>
                        <br />
                        <span className="text-white">{clips.find(c => c.id === activeClipId)?.text.split(' ').slice(4, 8).join(' ').toUpperCase()}</span>
                      </h2>
                    ) : clips.length > 0 ? (
                      <div>
                        <h2 className="text-2xl font-bold">
                          <span className="text-white">FULL VIDEO</span>
                          <span className="text-theme-orange"> PREVIEW</span>
                        </h2>
                        <div className="flex flex-col gap-2 mt-4">
                          {clips.map((clip, index) => (
                            <div key={clip.id} className="text-sm text-left p-2 border border-theme-gray/20 rounded bg-black/40">
                              <div className="text-theme-orange text-xs font-medium mb-1">Clip {index + 1} - {clip.durationSeconds}s</div>
                              <div className="text-white/80 text-xs truncate">{clip.text}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-white/70">
                        <Film size={48} className="mx-auto mb-4 text-theme-orange/50" />
                        Add your first clip to begin creating your video
                      </div>
                    )}
                    {!activeClipId && clips.length === 0 && (
                      <div className="mt-2 text-xs text-gray-400">
                        Your video clips will appear here
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Video Controls */}
              <div className="p-4 border-t border-theme-gray/20 flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  {activeClipId ? `Editing clip ${clips.findIndex(c => c.id === activeClipId) + 1} of ${clips.length}` : 
                   clips.length > 0 ? `Preview of full video (${clips.length} clips)` : "No clips created yet"}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-theme-gray/30 rounded-full">
                    <div 
                      className="h-full bg-theme-orange rounded-full"
                      style={{ width: `${clips.length ? (activeClipId ? 
                        ((clips.find(c => c.id === activeClipId)?.durationSeconds || 0) / maxDuration) * 100 : 
                        (totalDuration / maxDuration) * 100) : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateVideo;
