import { Plus, Video, Calendar, Download, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoProject } from "@/types/video";
import { Dialog, DialogContent, DialogClose, DialogFooter, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import VideoPreview from "@/components/create-video/VideoPreview";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Home = () => {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showProjectNameDialog, setShowProjectNameDialog] = useState(false);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    axios.get("http://91.134.66.237:8181/project").then((res) => {
      console.log(res)
      setProjects(res.data.projects)
    }).catch(err => {
      console.error("Failed to load projects:", err);
    });
  }, []);

  const handleCardClick = (project?: VideoProject) => {
    if (project) {
      setSelectedProject(project);
      setShowVideoDialog(true);
      console.log("Viewing project:", project);
    } else {
      setShowProjectNameDialog(true);
    }
  };
  
  const handleCreateProject = () => {
    if (!projectName.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a name for your project.",
        variant: "destructive"
      });
      return;
    }
    
    setShowProjectNameDialog(false);
    setProjectName("");
    
    localStorage.setItem("newProjectName", projectName);

    axios.post("http://91.134.66.237:8181/project", {
      name: projectName,
      negative_prompt: null,
      driving_image: {
        filename: null,
        subfolder: null, 
        folder_type: null
      }
    }).then((res) => console.log(res));
    
    navigate("/avatar-selection");
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const handleDownloadVideo = () => {
    toast({
      title: "Download started",
      description: "Your video is being prepared for download."
    });
    
    setTimeout(() => {
      toast({
        title: "Download ready",
        description: "Your video has been downloaded."
      });
    }, 2000);
  };
  
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Button 
              className="bg-theme-orange hover:bg-theme-orange-light flex items-center gap-3 text-lg px-6 py-6 rounded-xl shadow-lg font-semibold transform hover:scale-105 transition-all duration-200"
              size="lg"
              onClick={() => setShowProjectNameDialog(true)}
            >
              <Plus size={22} /> New Project
            </Button>
          </div>
          
          <h1 className="text-2xl font-bold mb-6 text-white">Your Projects</h1>
          
          <div className="relative rounded-xl bg-[#221F26]/10 backdrop-blur-sm p-6 shadow-lg overflow-hidden border border-[#403E43]/20">
            <div className="absolute top-0 left-0 w-12 h-12 rounded-tl-xl bg-[#221F26]/10 border-t border-l border-[#403E43]/20"></div>
            
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <Card 
                    key={index}
                    className="border border-[#8A898C]/40 bg-transparent cursor-pointer hover:bg-[#403E43]/20 transition-all rounded-xl overflow-hidden"
                    onClick={() => handleCardClick(project)}
                  >
                    <div className="aspect-[9/16] relative bg-[#1a1a1a] overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span>{project.title}</span>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-3">
                        <h3 className="text-white font-medium truncate">{project.title}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center text-xs text-gray-300">
                            <Calendar size={12} className="mr-1" />
                            {formatDate(project.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Card 
                  className="border border-[#8A898C]/40 bg-transparent cursor-pointer hover:bg-[#403E43]/20 transition-all rounded-xl overflow-hidden"
                  onClick={() => handleCardClick()}
                >
                  <div className="aspect-[9/16] relative bg-[#1a1a1a] overflow-hidden flex items-center justify-center">
                    <div className="text-center py-8 flex flex-col items-center gap-4">
                      <div className="bg-theme-black/70 rounded-full p-3 flex items-center justify-center">
                        <Plus size={24} className="text-theme-orange" />
                      </div>
                      <p className="text-xl text-muted-foreground italic max-w-md px-4">
                        Create a new project
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="flex justify-start">
                <Card 
                  className="border border-[#8A898C]/40 mt-4 bg-transparent cursor-pointer hover:bg-[#403E43]/20 transition-all w-64 max-w-xs rounded-xl overflow-hidden"
                  onClick={() => handleCardClick()}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center h-96">
                    <div className="text-center py-8 flex flex-col items-center gap-4">
                      <div className="bg-theme-black/70 rounded-full p-2 flex items-center">
                        <Video size={24} className="text-theme-orange" />
                        <span className="text-xs text-gray-400 ml-2">TikTok • 20s</span>
                      </div>
                      <p className="text-xl text-muted-foreground italic max-w-md">
                        Create your first project!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-[90vh] h-[90vh] bg-theme-black border-theme-gray/40 flex flex-col p-0">
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex items-center justify-center">
              {selectedProject && (
                <VideoPreview 
                  activeClipId={null}
                  clips={selectedProject.clips}
                  totalDuration={selectedProject.totalDuration}
                  maxDuration={20}
                  isFullscreen={true}
                />
              )}
            </div>
          </div>
          
          <DialogFooter className="border-t border-theme-gray/20 p-4 flex justify-between">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-transparent border-theme-gray/40 text-white hover:bg-theme-black/60"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={handleDownloadVideo}
              className="bg-theme-orange hover:bg-theme-orange-light flex items-center gap-2"
            >
              <Download size={16} />
              Download Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showProjectNameDialog} onOpenChange={setShowProjectNameDialog}>
        <DialogContent className="bg-theme-black border-theme-gray/40">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Project</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="project-name" className="text-sm text-muted-foreground mb-2 block">
              Enter a name for your project
            </Label>
            <div className="flex items-center gap-2">
              <FileText className="text-muted-foreground" size={20} />
              <Input 
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="My awesome video"
                className="border-theme-gray/40 bg-theme-black focus-visible:ring-theme-orange"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateProject();
                  }
                }}
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowProjectNameDialog(false)}
              className="bg-transparent border-theme-gray/40 text-white hover:bg-theme-black/60"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateProject}
              className="bg-theme-orange hover:bg-theme-orange-light"
            >
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Home;
