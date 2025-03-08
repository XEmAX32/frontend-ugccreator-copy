
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Avatar images with various styles
const AVATAR_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=800&fit=crop",
    alt: "2015 Style",
    label: "2015",
    year: "2015"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=800&fit=crop",
    alt: "2016 Style",
    label: "2016",
    year: "2016"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=800&fit=crop",
    alt: "2017 Style",
    label: "2017",
    year: "2017"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=800&fit=crop",
    alt: "2018 Style",
    label: "2018",
    year: "2018"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=800&fit=crop",
    alt: "2019 Style",
    label: "2019",
    year: "2019"
  },
  {
    id: 6,
    url: "public/lovable-uploads/0c18313a-7482-447a-89ba-81104e9faca3.png", 
    alt: "2020 Style",
    label: "2020",
    year: "2020"
  }
];

const AvatarSelection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1); // Default to first avatar
  const navigate = useNavigate();

  const handleAvatarSelect = (id: number) => {
    setSelectedAvatar(id);
  };

  const handleContinue = () => {
    navigate("/create-video");
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8 relative">
        {/* Fixed Continue button at top right */}
        <div className="fixed top-24 right-8 z-10">
          <Button
            className="bg-theme-orange hover:bg-theme-orange-light text-white px-8"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/home")}
              className="mr-auto"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-center mx-auto pr-10">Choose Your Avatar</h1>
          </div>

          {/* Avatar gallery with smooth scrolling */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6 max-h-[70vh] overflow-y-auto no-scrollbar pb-12 pr-2 scroll-smooth">
            {AVATAR_IMAGES.concat(AVATAR_IMAGES).concat(AVATAR_IMAGES).map((avatar, index) => (
              <Card 
                key={`${avatar.id}-${index}`}
                className={`relative rounded-lg overflow-hidden cursor-pointer transition-all hover:transform hover:scale-[1.02] ${
                  selectedAvatar === avatar.id 
                    ? "ring-2 ring-theme-orange" 
                    : "hover:ring-1 hover:ring-theme-orange/60"
                }`}
              >
                <button
                  className="w-full relative"
                  onClick={() => handleAvatarSelect(avatar.id)}
                  style={{ aspectRatio: '3/4' }}
                >
                  <img 
                    src={avatar.url} 
                    alt={avatar.alt} 
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">{avatar.year}</span>
                  </div>
                  
                  {selectedAvatar === avatar.id && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                      <div className="bg-theme-orange rounded-full w-8 h-8 flex items-center justify-center">
                        <Check size={16} className="text-white" />
                      </div>
                    </div>
                  )}
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AvatarSelection;
