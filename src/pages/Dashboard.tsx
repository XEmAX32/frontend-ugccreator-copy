
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import UserProfile from "@/components/auth/UserProfile";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserProfile />
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Card className="border-theme-gray">
              <CardHeader>
                <CardTitle className="text-xl">Your Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Create a new project or manage your existing ones.
                  </p>
                  <Button 
                    as={Link} 
                    to="/avatar-selection"
                    className="bg-theme-orange hover:bg-theme-orange-light flex items-center gap-2"
                  >
                    <Plus size={18} /> New Project
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <DashboardCard 
                    title="User Sessions" 
                    value="1" 
                    description="Active session" 
                  />
                  <DashboardCard 
                    title="Authentication" 
                    value="Secure" 
                    description="Your connection is secure" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

const DashboardCard = ({ 
  title, 
  value, 
  description 
}: { 
  title: string; 
  value: string; 
  description: string; 
}) => {
  return (
    <div className="bg-card rounded-lg border border-theme-gray p-6">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold text-theme-orange mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Dashboard;
