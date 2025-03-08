
import { Plus, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock project data that would come from an API in a real app
const mockProjects = [] as any[]; // Empty array for now

// Mock format options based on the image
const projectFormats = [
  {
    id: 1,
    title: "Social media",
    subtitle: "Ideal to launch a new vertical",
    duration: "30s",
    icon: "📱",
    type: "tiktok, shorts"
  },
  {
    id: 2,
    title: "Classic",
    subtitle: "Ideal to boost your article's SEO ranking",
    duration: "2min",
    icon: "🎬",
    type: "youtube"
  }
];

const Home = () => {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button 
              asChild 
              className="bg-theme-orange hover:bg-theme-orange-light flex items-center gap-2"
            >
              <Link to="/avatar-selection">
                <Plus size={18} /> New Project
              </Link>
            </Button>
          </div>
          
          {/* Filter Categories */}
          <div className="flex gap-2 mb-8 justify-center">
            <Button variant="secondary" className="rounded-full bg-white text-black hover:bg-gray-100">
              All
            </Button>
            <Button variant="secondary" className="rounded-full bg-muted hover:bg-muted/80">
              Personal
            </Button>
            <Button variant="secondary" className="rounded-full bg-muted hover:bg-muted/80">
              Ugc
            </Button>
            <Button variant="secondary" className="rounded-full bg-muted hover:bg-muted/80">
              Masterclass
            </Button>
          </div>
          
          {mockProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {/* Projects would be mapped here */}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-left">Video format</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {projectFormats.map((format) => (
                  <Card 
                    key={format.id} 
                    className="border-theme-gray bg-theme-black/50 hover:bg-theme-gray/20 transition-all cursor-pointer overflow-hidden rounded-lg border border-theme-gray/40"
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-[5/3]">
                        <div className="absolute top-2 left-2 flex items-center">
                          <div className="bg-theme-black/70 rounded-full p-1.5 flex items-center">
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-xs text-gray-400 ml-1">{format.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-center items-center h-full">
                          <div className="text-4xl">{format.icon}</div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-lg">{format.title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm">{format.type}</p>
                        <p className="text-gray-500 text-xs mt-2">{format.subtitle}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {mockProjects.length === 0 && (
            <Card className="border-theme-gray mt-8 bg-transparent">
              <CardContent className="p-8">
                <div className="text-center py-8">
                  <p className="text-xl text-muted-foreground italic">
                    Ready to bring your creative vision to life? Create your first project!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
