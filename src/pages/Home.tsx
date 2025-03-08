
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock project data that would come from an API in a real app
const mockProjects = [] as any[]; // Empty array for now

const Home = () => {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button 
              asChild 
              className="bg-theme-orange hover:bg-theme-orange-light flex items-center gap-2"
            >
              <Link to="/avatar-selection">
                <Plus size={18} /> New Project
              </Link>
            </Button>
          </div>
          
          {/* Filter Categories - similar to the image */}
          <div className="flex gap-2 mb-6 justify-center">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {/* Projects would be mapped here */}
            </div>
          ) : (
            <Card className="border-theme-gray">
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground italic">
                    Ready to bring your creative vision to life? Create your first project to get started!
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
