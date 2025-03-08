
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button 
              asChild 
              className="bg-theme-orange hover:bg-theme-orange-light flex items-center gap-2 w-full"
            >
              <Link to="/avatar-selection">
                <Plus size={18} /> New Project
              </Link>
            </Button>
          </div>
          
          <Card className="border-theme-gray">
            <CardContent className="p-8">
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground italic">
                  You don't have any projects yet. Create one to get started!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
