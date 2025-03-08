
import { Plus, Video, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoProject } from "@/types/video";

const Home = () => {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('videoProjects') || '[]');
    setProjects(savedProjects);
  }, []);

  const handleCardClick = (project?: VideoProject) => {
    if (project) {
      // In a real app, this would navigate to an edit page for the project
      console.log("Viewing project:", project);
      // For now, we'll just show the create page
      navigate("/create-video");
    } else {
      navigate("/avatar-selection");
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Button 
              asChild 
              className="bg-theme-orange hover:bg-theme-orange-light flex items-center gap-3 text-lg px-6 py-6 rounded-xl shadow-lg font-semibold transform hover:scale-105 transition-all duration-200"
              size="lg"
            >
              <Link to="/avatar-selection">
                <Plus size={22} /> New Project
              </Link>
            </Button>
          </div>
          
          {/* Page Title */}
          <h1 className="text-2xl font-bold mb-6 text-white">Your Projects</h1>
          
          {/* Gallery with background and frame */}
          <div className="relative rounded-xl bg-[#221F26]/10 backdrop-blur-sm p-6 shadow-lg overflow-hidden border border-[#403E43]/20">
            {/* Decorative top-left corner radius */}
            <div className="absolute top-0 left-0 w-12 h-12 rounded-tl-xl bg-[#221F26]/10 border-t border-l border-[#403E43]/20"></div>
            
            {/* Gallery content */}
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <Card 
                    key={project.id}
                    className="border border-[#8A898C]/40 bg-transparent cursor-pointer hover:bg-[#403E43]/20 transition-all rounded-xl overflow-hidden"
                    onClick={() => handleCardClick(project)}
                  >
                    <div className="aspect-[9/16] relative bg-[#1a1a1a] overflow-hidden">
                      {/* Thumbnail or placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={project.thumbnail} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Project info overlay - simplified to only show title and date */}
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
                
                {/* Add new project card */}
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
    </PageContainer>
  );
};

export default Home;
