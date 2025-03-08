
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Video } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const CreateVideo = () => {
  const [promptText, setPromptText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the prompt here
    console.log("Submitting prompt:", promptText);
    // Navigate to the next step (would be implemented in a real app)
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/avatar-selection")}
              className="mr-4"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Choose Your Next Move: Direct the Action and Guide Your Avatar</h1>
          </div>

          <Card className="border-theme-gray/40 bg-theme-black/50 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Vertical Image Column */}
              <div className="w-full md:w-2/5 lg:w-1/3">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gallery-border">
                  <img 
                    src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" 
                    alt="Avatar reference" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Video size={20} className="text-theme-orange" />
                      <span className="text-sm font-medium">TikTok Video • 20s</span>
                    </div>
                    <h3 className="text-lg font-bold">Your Avatar</h3>
                    <p className="text-sm text-gray-300">Ready for direction</p>
                  </div>
                </div>
              </div>

              {/* Text Prompt Column */}
              <div className="w-full md:w-3/5 lg:w-2/3">
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                  <h2 className="text-xl font-semibold mb-4">Enter Your Directions</h2>
                  
                  <div className="flex-grow mb-4">
                    <Textarea
                      placeholder="Describe what you want your avatar to do or say. Be specific about actions, expressions, and tone. For example: 'Explain the benefits of meditation while smiling and using hand gestures for emphasis.'"
                      className="min-h-[240px] resize-none bg-theme-black/70 border-theme-gray-light/30 focus:border-theme-orange"
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-theme-orange hover:bg-theme-orange-light text-white flex items-center gap-2 px-6 py-2 font-medium"
                      disabled={!promptText.trim()}
                    >
                      Generate Video <Send size={16} />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateVideo;
