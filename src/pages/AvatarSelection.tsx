
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Wand2 } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Avatar images with various styles
const AVATAR_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=800&fit=crop",
    alt: "2015 Style",
    name: "YOU",
    year: "2015",
    category: "personal"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=800&fit=crop",
    alt: "2016 Style",
    name: "LAO",
    year: "2016",
    category: "personal"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=800&fit=crop",
    alt: "2017 Style",
    name: "INÈS",
    year: "2017",
    category: "ugc"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=800&fit=crop",
    alt: "2018 Style",
    name: "ANNIE",
    year: "2018",
    category: "masterclass"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=800&fit=crop",
    alt: "2019 Style",
    name: "INÈS OUTDOORS",
    year: "2019",
    category: "ugc"
  },
  {
    id: 6,
    url: "public/lovable-uploads/0c18313a-7482-447a-89ba-81104e9faca3.png", 
    alt: "2020 Style",
    name: "MIA",
    year: "2020",
    category: "personal"
  }
];

// Sample AI generated avatars for the modal
const AI_GENERATED_AVATARS = [
  { id: "gen1", url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=800&fit=crop" },
  { id: "gen2", url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=800&fit=crop" },
  { id: "gen3", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=800&fit=crop" },
];

// Simplified categories
const SIMPLIFIED_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "personal", label: "Personal" }
];

const AvatarSelection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1); // Default to first avatar
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [promptText, setPromptText] = useState("");
  const navigate = useNavigate();

  const handleAvatarSelect = (id: number) => {
    setSelectedAvatar(id);
  };

  const handleContinue = () => {
    navigate("/create-video");
  };

  const handleGenerateAvatar = () => {
    // This would be where you'd call an API to generate a new avatar
    console.log("Generating avatar with prompt:", promptText);
    // For now, just close the modal
    setPromptText("");
    setIsGenerateModalOpen(false);
  };

  const filteredAvatars = activeCategory === "all" 
    ? AVATAR_IMAGES 
    : AVATAR_IMAGES.filter(avatar => avatar.category === activeCategory);

  return (
    <PageContainer>
      <div className="container px-4 py-6 relative bg-transparent min-h-screen">
        {/* Fixed Continue button at top right */}
        <div className="fixed top-24 right-8 z-10">
          <Button
            className="bg-theme-orange hover:bg-theme-orange-light text-white px-8"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center relative">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/home")}
              className="absolute left-0 top-0 text-white"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl font-bold text-white">Choose Your Avatar</h1>
          </div>

          {/* Simplified Category filters + Generate button */}
          <div className="flex justify-center space-x-2 mb-8">
            {SIMPLIFIED_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`rounded-full px-6 transition-all ${
                  activeCategory === category.id
                    ? "bg-white text-black"
                    : "bg-black/20 text-white border-white/20 hover:bg-black/40"
                }`}
              >
                {category.label}
              </Button>
            ))}
            
            <Button
              onClick={() => setIsGenerateModalOpen(true)}
              variant="outline"
              className="rounded-full px-6 bg-theme-orange/90 text-white border-white/20 hover:bg-theme-orange"
            >
              <Wand2 className="mr-2" size={16} />
              Generate New Avatar
            </Button>
          </div>

          {/* Avatar gallery with smooth scrolling - no scrollbar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6 max-h-[65vh] overflow-y-auto no-scrollbar pb-12 scroll-smooth">
            {filteredAvatars.map((avatar) => (
              <Card 
                key={avatar.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.03] border-0 bg-transparent ${
                  selectedAvatar === avatar.id 
                    ? "ring-2 ring-white" 
                    : "hover:ring-1 hover:ring-white/60"
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
                    className="w-full h-full object-cover rounded-lg"
                  />
                  
                  {/* Name overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-3 px-3">
                    <span className="text-white text-lg font-bold">{avatar.name}</span>
                  </div>
                  
                  {/* Premium badge - only for the first avatar */}
                  {avatar.id === 1 && (
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-amber-500 text-black text-xs px-2 py-0.5 rounded-full font-medium">
                        Premium
                      </div>
                    </div>
                  )}
                  
                  {selectedAvatar === avatar.id && (
                    <div className="absolute top-3 right-3">
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

      {/* Generate New Avatar Modal */}
      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogContent className="sm:max-w-[900px] bg-gradient-to-br from-gray-900/95 to-black/95 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-white">Generate New Avatar</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Prompt Input */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Enter Your Prompt</h3>
              <Textarea 
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Describe your avatar... (e.g., 'A professional woman with short dark hair and glasses in a business setting')"
                className="h-32 bg-gray-800/50 border-gray-700 text-white"
              />
              <Button 
                onClick={handleGenerateAvatar}
                className="w-full bg-theme-orange hover:bg-theme-orange-light"
                disabled={!promptText.trim()}
              >
                <Wand2 className="mr-2" size={16} />
                Generate Avatar
              </Button>
            </div>
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Generated Avatars</h3>
              <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto no-scrollbar">
                {AI_GENERATED_AVATARS.map((avatar) => (
                  <div key={avatar.id} className="relative">
                    <img 
                      src={avatar.url} 
                      alt="Generated avatar" 
                      className="w-full rounded-lg object-cover" 
                      style={{ aspectRatio: '3/4' }}
                    />
                    <Button 
                      className="absolute bottom-3 right-3 bg-theme-orange hover:bg-theme-orange-light"
                      size="sm"
                      onClick={() => {
                        // Add this avatar to the main list
                        console.log("Selected generated avatar:", avatar.id);
                        setIsGenerateModalOpen(false);
                      }}
                    >
                      Use Avatar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setIsGenerateModalOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default AvatarSelection;
