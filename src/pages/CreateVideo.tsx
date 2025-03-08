
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle, Send, Video } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const promptExamples = [
  "Create a 30-second video explaining why effective time management is crucial for entrepreneurs.",
  "I need a concise explanation of how blockchain technology works for beginners.",
  "Generate a video introducing my new fitness app with energetic and motivational tone.",
  "Create a professional welcome message for my company website highlighting our core values."
];

const CreateVideo = () => {
  const [promptText, setPromptText] = useState("");
  const [showExamples, setShowExamples] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the prompt here
    console.log("Submitting prompt:", promptText);
    // Navigate to the next step (would be implemented in a real app)
  };

  const insertExample = (example: string) => {
    setPromptText(example);
    setShowExamples(false);
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/avatar-selection")}
            className="mr-4"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">Create Your Video</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Script Editor */}
          <div className="space-y-4">
            <Card className="border-theme-gray/40 bg-theme-black/80 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-white font-medium">Write Your Script</h2>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setShowExamples(!showExamples)}
                      className="bg-theme-orange hover:bg-theme-orange-light text-white border-none rounded-full"
                    >
                      <HelpCircle size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click for prompt examples</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              {showExamples && (
                <div className="mb-4 p-4 bg-theme-black/70 border border-theme-gray/30 rounded-md">
                  <h3 className="text-sm font-medium text-theme-orange mb-2">Prompt Examples:</h3>
                  <ul className="space-y-2">
                    {promptExamples.map((example, index) => (
                      <li key={index}>
                        <button 
                          onClick={() => insertExample(example)}
                          className="text-xs text-white/80 hover:text-theme-orange text-left w-full p-2 rounded hover:bg-theme-gray/20 transition-colors"
                        >
                          {example}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                <Textarea
                  placeholder="Have you ever wondered why the advice on scaling your startup sometimes backfires? Write your script here..."
                  className="min-h-[400px] resize-none bg-transparent border-theme-gray-light/30 focus:border-theme-orange text-white"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                />
                
                <div className="flex justify-end mt-4">
                  <Button 
                    type="submit"
                    className="bg-theme-orange hover:bg-theme-orange-light text-white flex items-center gap-2 px-6 py-2 font-medium"
                    disabled={!promptText.trim()}
                  >
                    Generate Video <Send size={16} />
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Right Column - Video Preview */}
          <div className="relative">
            <Card className="border-theme-gray/40 bg-theme-black/50 rounded-lg overflow-hidden h-full min-h-[400px] flex flex-col">
              {/* Video Preview Area */}
              <div className="relative flex-1 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] overflow-hidden">
                {/* Avatar Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-black/80 px-3 py-1 rounded-full flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-theme-orange flex items-center justify-center">
                      <Video size={12} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-white">Gesture 1</span>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center w-full px-8">
                    <h2 className="text-2xl font-bold">
                      <span className="text-white">HAVE YOU </span>
                      <span className="text-theme-orange">EVER</span>
                      <br />
                      <span className="text-white">WONDERED WHY THE</span>
                    </h2>
                    <div className="mt-2 text-xs text-gray-400">
                      This is a preview, click generate
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Controls */}
              <div className="p-4 border-t border-theme-gray/20 flex justify-between items-center">
                <div className="text-xs text-gray-400">Preview</div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-theme-gray/30 rounded-full">
                    <div className="w-1/3 h-full bg-theme-orange rounded-full"></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateVideo;
