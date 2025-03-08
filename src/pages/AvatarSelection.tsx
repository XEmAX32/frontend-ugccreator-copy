
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Avatar images with years to match the design in the reference image
const AVATAR_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    alt: "2015",
    label: "2015",
    year: "2015"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    alt: "2016",
    label: "2016",
    year: "2016"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    alt: "2017",
    label: "2017",
    year: "2017"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    alt: "2018",
    label: "2018",
    year: "2018"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    alt: "2019",
    label: "2019",
    year: "2019"
  },
  {
    id: 6,
    url: "public/lovable-uploads/0c18313a-7482-447a-89ba-81104e9faca3.png", 
    alt: "2020",
    label: "2020",
    year: "2020"
  }
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
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-10">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/home")}
              className="mr-4"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Choose Project Style</h1>
          </div>

          <div className="w-full overflow-x-auto pb-6 no-scrollbar">
            <div className="flex space-x-4 min-w-min">
              {AVATAR_IMAGES.map((avatar) => (
                <Card 
                  key={avatar.id}
                  className={`relative rounded-xl overflow-hidden flex-shrink-0 border-0 shadow-lg transition-all ${
                    selectedAvatar === avatar.id 
                      ? "ring-2 ring-theme-orange" 
                      : "hover:ring-1 hover:ring-theme-orange/60"
                  }`}
                  style={{ width: '280px', height: '180px' }}
                >
                  <button
                    className="w-full h-full relative"
                    onClick={() => handleAvatarSelect(avatar.id)}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4">
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

          <div className="mt-10 flex justify-end">
            <Button
              className="bg-theme-orange hover:bg-theme-orange-light text-white px-8"
              disabled={selectedAvatar === null}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AvatarSelection;
