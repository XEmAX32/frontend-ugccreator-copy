
import { FormEvent, useState } from "react";
import { Film, Hand, Clock, Package, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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
  onSubmit,
  clipText,
}: ScriptEditorProps) => {
  const [avatarMovements, setAvatarMovements] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [speechPrompt, setSpeechPrompt] = useState(promptText || clipText || "");
  const [showMovementHints, setShowMovementHints] = useState(false);
  const [showSpeechHints, setShowSpeechHints] = useState(false);

  // Handle changes to both text areas
  const handleSpeechPromptChange = (text: string) => {
    setSpeechPrompt(text);
    onPromptChange(text);
  };

  // When a product is selected, update the state and add it to the movements text
  const handleProductSelect = (product: string) => {
    if (product === "No Product") {
      setSelectedProduct(null);
      return;
    }
    
    setSelectedProduct(product);
    setAvatarMovements((prev) => 
      prev ? `${prev}\nInteract with ${product}` : `Interact with ${product}`
    );
  };

  const handleMovementExampleClick = (example: string) => {
    setAvatarMovements((prev) => prev ? `${prev}\n${example}` : example);
    setShowMovementHints(false);
  };

  const handleSpeechExampleClick = (example: string) => {
    handleSpeechPromptChange(example);
    setShowSpeechHints(false);
  };

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
      
      <form onSubmit={onSubmit} className="flex flex-col h-full">
        {/* Avatar Movements Box */}
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
        </div>
        
        {/* Speech Prompt Box */}
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
              className="bg-theme-orange hover:bg-theme-orange-light text-white flex items-center gap-2 px-6 py-2 font-medium"
              disabled={!speechPrompt.trim() || remainingDuration <= 0}
            >
              {activeClipId ? "Update Clip" : "Generate Clip"} <Film size={16} />
            </Button>
          </div>
        </div>
      </form>

      {/* Movement Hints Dialog */}
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

      {/* Speech Hints Dialog */}
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
