
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AVATAR_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
    alt: "Avatar 1"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop",
    alt: "Avatar 2"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    alt: "Avatar 3"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
    alt: "Avatar 4"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop",
    alt: "Avatar 5"
  },
];

const AvatarSelection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAvatarSelect = (id: number) => {
    setSelectedAvatar(id);
  };

  const handleContinue = () => {
    // In a real app, you would save the selected avatar
    // For now, just navigate back to the dashboard
    navigate("/dashboard");
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/dashboard")}
              className="mr-4"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl font-bold">Choose Project Avatar</h1>
          </div>

          <Card className="border-theme-gray p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {AVATAR_IMAGES.map((avatar) => (
                <div 
                  key={avatar.id}
                  className="flex flex-col items-center"
                >
                  <button
                    className={`relative rounded-full p-1 transition-all ${
                      selectedAvatar === avatar.id 
                        ? "ring-2 ring-theme-orange" 
                        : "hover:ring-2 hover:ring-theme-orange-light"
                    }`}
                    onClick={() => handleAvatarSelect(avatar.id)}
                  >
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={avatar.url} alt={avatar.alt} />
                      <AvatarFallback className="bg-theme-gray">{avatar.alt[0]}</AvatarFallback>
                    </Avatar>
                    {selectedAvatar === avatar.id && (
                      <div className="absolute bottom-0 right-0 bg-theme-orange rounded-full p-1">
                        <Check size={16} className="text-white" />
                      </div>
                    )}
                  </button>
                  <span className="mt-2 text-sm text-muted-foreground">
                    Avatar {avatar.id}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                className="bg-theme-orange hover:bg-theme-orange-light"
                disabled={selectedAvatar === null}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default AvatarSelection;
