
import { Link } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";

const Index = () => {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Secure Authentication with{" "}
            <span className="text-theme-orange">Clerk</span>
          </h1>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            A modern authentication solution with a sleek black and orange UI. 
            Featuring email/password registration and Google OAuth login.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signin" className="auth-button-outline">
              Sign In
            </Link>
            <Link to="/signup" className="auth-button">
              Create Account
            </Link>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <FeatureCard 
            title="Email Authentication" 
            description="Register and sign in securely using your email and password."
          />
          <FeatureCard 
            title="Google OAuth" 
            description="Quickly sign in with your Google account for a seamless experience."
          />
          <FeatureCard 
            title="Modern UI" 
            description="Enjoy a sleek black and orange interface designed for the best user experience."
          />
        </div>
      </div>
    </PageContainer>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-theme-gray rounded-lg p-6 border border-theme-gray-light">
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
