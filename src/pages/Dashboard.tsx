
import UserProfile from "@/components/auth/UserProfile";
import PageContainer from "@/components/layout/PageContainer";

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
            <div className="bg-card rounded-lg border border-theme-gray p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
              <p className="text-muted-foreground">
                This is your authenticated dashboard. You can now access protected features of the application.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
