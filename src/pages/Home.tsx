
import { Plus, Video } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock project data that would come from an API in a real app
const mockProjects = [] as any[]; // Empty array for now

const Home = () => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/avatar-selection");
  };
  
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Button asChild className="bg-theme-orange hover:bg-theme-orange-light flex items-center gap-2">
              <Link to="/avatar-selection">
                <Plus size={18} /> New
              </Link>
            </Button>
          </div>
          
          {/* Page Title */}
          <h1 className="text-2xl font-bold mb-6 text-white">Your Projects</h1>
          
          {mockProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {/* Projects would be mapped here */}
            </div>
          ) : (
            <div className="flex justify-start">
              <Card 
                className="border-theme-gray mt-8 bg-transparent cursor-pointer hover:bg-theme-gray/10 transition-all w-64 max-w-xs"
                onClick={handleCardClick}
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
    </PageContainer>
  );
};

export default Home;
