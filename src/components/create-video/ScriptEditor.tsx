import { FormEvent, useState, useEffect } from "react";
import { Film, Hand, Clock, Package, Lightbulb, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import GenerationProgress from "@/components/avatar/GenerationProgress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PromptExamplesPanel from "./PromptExamplesPanel";
import axios from "axios";

interface ScriptEditorProps {
  activeClipId: string | null;
  promptText: string;
  promptExamples: string[];
  showExamples: boolean;
  remainingDuration: number;
  onPromptChange: (text: string) => void;
  onExampleClick: (example: string) => void;
  onToggleExamples: () => void;
  onSubmit: (e: FormEvent) => void;
  clipText?: string;
  onGenerationEnded: () => void;
}

const PRODUCT_OPTIONS = [
  "No Product",
  "Smartphone",
  "Laptop",
  "Headphones",
  "Smartwatch",
  "Camera",
  "Speaker",
  "Tablet",
];

const MOVEMENT_EXAMPLES = [
  "Walk towards the camera while gesturing with hands",
  "Stand confidently and point to the product",
  "Pick up the product and examine it closely",
  "Show excitement when revealing the product features",
  "Demonstrate the product in use",
  "Make a thumbs up gesture",
  "Point to specific parts of the product while explaining",
];

const SPEECH_EXAMPLES = [
  "Today I'm excited to show you our latest innovation...",
  "Have you ever wondered how this technology works?",
  "This product solves a problem that many people face daily...",
  "Let me explain why this is a game-changer in the industry...",
  "The three key benefits of this product are...",
  "Our customers love this feature because...",
  "Imagine how this would improve your daily routine...",
];

const ScriptEditor = ({
  activeClipId,
  promptText,
  promptExamples,
  showExamples,
  remainingDuration,
  onPromptChange,
  onExampleClick,
  onToggleExamples,
  onGenerationEnded,
  onSubmit,
  clipText,
}: ScriptEditorProps) => {
  const [avatarMovements, setAvatarMovements] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [speechPrompt, setSpeechPrompt] = useState(promptText || clipText || "");
  const [showMovementHints, setShowMovementHints] = useState(false);
  const [showSpeechHints, setShowSpeechHints] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<{value: number, max: number} | null>({value: 0, max: 0});
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generationMessage, setGenerationMessage] = useState("");

  const handleSpeechPromptChange = (text: string) => {
    setSpeechPrompt(text);
    onPromptChange(text);
  };

  const handleProductSelect = (product: string) => {
    setSelectedProduct(product);
  };

  const handleMovementExampleClick = (example: string) => {
    setAvatarMovements((prev) => prev ? `${prev}\n${example}` : example);
    setShowMovementHints(false);
  };

  const handleSpeechExampleClick = (example: string) => {
    handleSpeechPromptChange(example);
    setShowSpeechHints(false);
  };

  const handleGenerateClip = async () => {
    if (!activeClipId) {
      console.error("No active clip ID");
      return;
    }

    try {
      const response = await axios.post(`/clip/${activeClipId}/generate`, {
        avatarMovements,
      });

      console.log("Clip generated successfully!", response.data);
    } catch (error) {
      console.error("Error generating clip:", error);
    }
  };

  const handleGenerateVideo = async () => {
    if (!activeClipId) {
      console.error("No active clip ID");
      return;
    }

    setIsGeneratingVideo(true);
    setGenerationMessage("Starting video generation...");

    try {
      connectToWebsocket(activeClipId);
      const currentClipId = localStorage.getItem("currentClipId");
      const response = await axios.post(`http://91.134.66.237:8181/clip/${currentClipId}/generate`, {
        prompt: avatarMovements,
      }, {
        headers: {'Content-Type': "application/json",}
      }).then((res) => console.log('res on video shit', res));

    } catch (error) {
      console.error("Error generating video:", error);
      setIsGeneratingVideo(false);
      setGenerationMessage("Error generating video");
    }
  };

  const connectToWebsocket = (clipId: string) => {
    const wsUrl = `ws://91.134.66.237:8181/gen_status`;
    
    const socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
      console.log('WebSocket connection established');
      setGenerationMessage("Connected to video generation service...");
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        
        if (data.value !== undefined && data.max !== undefined) {
          setGenerationProgress({
            value: data.value,
            max: data.max
          });
        }
        
        if (data.message) {
          setGenerationMessage(data.message);
        }
        
        if (data.progress === 100 || data.status === 'completed') {
          setIsGeneratingVideo(false);
          setVideoGenerated(true);
          setGenerationMessage("Video generation complete!");
          socket.close();
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsGeneratingVideo(false);
      setGenerationMessage("Error connecting to video service");
    };
    
    socket.onclose = () => {
      console.log('WebSocket connection closed');

    };
    
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  };

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <Card className="border-theme-gray/40 bg-theme-black/80 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-white font-medium">
          {activeClipId ? "Edit Clip Script" : "Write New Clip Script"}
        </h2>
      </div>
      
      {showExamples && (
        <PromptExamplesPanel 
          examples={promptExamples} 
          onExampleClick={onExampleClick} 
        />
      )}
      
      <form onSubmit={} className="flex flex-col h-full">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-white/80">Avatar Movements & Product Interaction</h3>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="h-7 px-3 py-1 bg-theme-gray/30 hover:bg-theme-gray/50 text-white flex items-center gap-2 border-none rounded-md shadow-md"
                    onClick={(e) => e.preventDefault()} // Prevent form submission
                  >
                    <Package size={16} />
                    <span className="font-medium text-sm">{selectedProduct || "Select Product"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-theme-black/90 border-theme-gray/30">
                  {PRODUCT_OPTIONS.map((product) => (
                    <DropdownMenuItem 
                      key={product} 
                      onClick={() => handleProductSelect(product)}
                      className="text-white hover:bg-theme-gray/30 cursor-pointer"
                    >
                      {product}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  setShowMovementHints(true);
                }}
                className="h-7 px-2 bg-theme-gray/30 hover:bg-theme-gray/50 text-white border-none rounded-md shadow-md"
              >
                <Lightbulb size={14} className="text-theme-orange mr-1" />
                <span className="text-xs">Hints</span>
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Describe how the avatar should move and interact with the product..."
            className="min-h-[100px] resize-none bg-transparent border-theme-gray-light/30 focus:border-theme-orange text-white"
            value={avatarMovements}
            onChange={(e) => setAvatarMovements(e.target.value)}
          />
          <div className="mt-2 flex flex-col gap-2">
            {isGeneratingVideo && (
              <div className="w-full space-y-2 mb-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-white/70">{generationMessage}</p>
                  <span className="text-xs text-theme-orange">{generationProgress.value}/{generationProgress.max}</span>
                </div>
                <GenerationProgress isGenerating={isGeneratingVideo} progress={generationProgress} />
              </div>
            )}
            <div className="flex justify-end">
              <Button 
                type="button"
                onClick={handleGenerateVideo}  
                className="bg-theme-orange hover:bg-theme-orange-light text-white flex items-center gap-2 px-6 py-2 font-medium"
                disabled={!avatarMovements.trim() || isGeneratingVideo}
              >
                {isGeneratingVideo ? "Generating..." : "Generate Video"} <Video size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-white/80">Avatar Speech</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                setShowSpeechHints(true);
              }}
              className="h-7 px-2 bg-theme-gray/30 hover:bg-theme-gray/50 text-white border-none rounded-md shadow-md"
            >
              <Lightbulb size={14} className="text-theme-orange mr-1" />
              <span className="text-xs">Hints</span>
            </Button>
          </div>
          <Textarea
            placeholder={activeClipId 
              ? "Edit what the avatar should say in this clip..." 
              : "Write what the avatar should say in this clip..."}
            className="min-h-[180px] resize-none bg-transparent border-theme-gray-light/30 focus:border-theme-orange text-white"
            value={speechPrompt}
            onChange={(e) => handleSpeechPromptChange(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between mt-2">
          {remainingDuration <= 0 && (
            <div className="text-yellow-500 text-xs flex items-center">
              <Clock size={14} className="mr-1" /> 
              You've reached the maximum 20 seconds for your video
            </div>
          )}
          <div className="ml-auto">
            <Button 
              type="submit"
              onClick={handleGenerateClip}  
              className="bg-theme-orange hover:bg-theme-orange-light text-white flex items-center gap-2 px-6 py-2 font-medium"
              disabled={!speechPrompt.trim() || remainingDuration <= 0 || !videoGenerated || isGeneratingVideo}
            >
              Generate Speech <Film size={16} />
            </Button>
          </div>
        </div>
      </form>

      <Dialog open={showMovementHints} onOpenChange={setShowMovementHints}>
        <DialogContent className="bg-theme-black border-theme-gray/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-theme-orange">Avatar Movement Hints</DialogTitle>
            <DialogDescription className="text-white/70">
              Choose an example or get inspired for your avatar's movements and interactions.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 space-y-2">
            {MOVEMENT_EXAMPLES.map((example, index) => (
              <button
                key={index}
                className="w-full text-left p-2 hover:bg-theme-gray/20 rounded-md text-sm"
                onClick={() => handleMovementExampleClick(example)}
              >
                {example}
              </button>
            ))}
          </div>
          <DialogClose asChild>
            <Button variant="outline" className="mt-2 border-theme-gray/30 text-white">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={showSpeechHints} onOpenChange={setShowSpeechHints}>
        <DialogContent className="bg-theme-black border-theme-gray/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-theme-orange">Speech Prompt Hints</DialogTitle>
            <DialogDescription className="text-white/70">
              Choose an example or get inspired for what your avatar can say.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 space-y-2">
            {SPEECH_EXAMPLES.map((example, index) => (
              <button
                key={index}
                className="w-full text-left p-2 hover:bg-theme-gray/20 rounded-md text-sm"
                onClick={() => handleSpeechExampleClick(example)}
              >
                {example}
              </button>
            ))}
          </div>
          <DialogClose asChild>
            <Button variant="outline" className="mt-2 border-theme-gray/30 text-white">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ScriptEditor;
