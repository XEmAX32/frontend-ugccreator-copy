import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Clock } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Avatar images that resemble the layout from the reference image
const AVATAR_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
    alt: "YOU",
    label: "YOU",
    tag: "Premium"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop",
    alt: "LAO",
    label: "LAO",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    alt: "INÈS",
    label: "INÈS",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
    alt: "ANNIE",
    label: "ANNIE",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop",
    alt: "INÈS OUTDOORS",
    label: "INÈS OUTDOORS",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
    alt: "MIA",
    label: "MIA",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    alt: "MIA OUTDOORS",
    label: "MIA OUTDOORS",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop",
    alt: "PAULINA",
    label: "PAULINA",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
    alt: "MARIA",
    label: "MARIA",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop",
    alt: "ANTON",
    label: "ANTON",
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
    alt: "INÈS GREEN TOP",
    label: "INÈS GREEN TOP",
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    alt: "MIA BEIGE TOP",
    label: "MIA BEIGE TOP",
  },
];

const AvatarSelection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAvatarSelect = (id: number) => {
    setSelectedAvatar(id);
  };

  const handleContinue = () => {
    navigate("/create-video");
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/home")}
              className="mr-4"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Choose Project Avatar</h1>
          </div>

          <Card className="border-theme-gray/40 bg-theme-black/50 p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {AVATAR_IMAGES.map((avatar) => (
                <div 
                  key={avatar.id}
                  className="relative flex flex-col"
                >
                  <button
                    className={`relative rounded-lg overflow-hidden aspect-[3/4] w-full transition-all ${
                      selectedAvatar === avatar.id 
                        ? "ring-2 ring-theme-orange" 
                        : "hover:ring-2 hover:ring-theme-orange-light"
                    }`}
                    onClick={() => handleAvatarSelect(avatar.id)}
                  >
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                    
                    <img 
                      src={avatar.url} 
                      alt={avatar.alt} 
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-semibold text-sm">{avatar.label}</p>
                    </div>
                    
                    {avatar.tag && (
                      <div className="absolute top-2 right-2 bg-theme-orange rounded-full px-2 py-0.5">
                        <span className="text-white text-xs font-medium">{avatar.tag}</span>
                      </div>
                    )}
                    
                    {selectedAvatar === avatar.id && (
                      <div className="absolute top-2 right-2 bg-theme-orange rounded-full p-1">
                        <Check size={16} className="text-white" />
                      </div>
                    )}
                  </button>
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
