
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = () => {
    // Here you would connect to Clerk's sign out API
    console.log("Signing out user...");
    
    // Simulate sign out (replace with actual Clerk sign out)
    setTimeout(() => {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      navigate("/signin");
    }, 500);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-theme-gray bg-theme-black">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Your Profile</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-theme-orange text-white">
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-medium">Demo User</p>
            <p className="text-sm text-muted-foreground">user@example.com</p>
          </div>
        </div>
        
        <div className="rounded-md bg-theme-gray p-4">
          <p className="text-sm mb-1">Account Status</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Active
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full text-theme-orange border-theme-gray hover:bg-theme-gray hover:text-theme-orange-light"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
