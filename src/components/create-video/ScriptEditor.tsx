
import { FormEvent, useState } from "react";
import { Film, Hand, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  "Smartphone",
  "Laptop",
  "Headphones",
  "Smartwatch",
  "Camera",
  "Speaker",
  "Tablet",
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

  // Handle changes to both text areas
  const handleSpeechPromptChange = (text: string) => {
    setSpeechPrompt(text);
    onPromptChange(text);
  };

  // When a product is selected, update the state and add it to the movements text
  const handleProductSelect = (product: string) => {
    setSelectedProduct(product);
    setAvatarMovements((prev) => 
      prev ? `${prev}\nInteract with ${product}` : `Interact with ${product}`
    );
  };

  return (
    <Card className="border-theme-gray/40 bg-theme-black/80 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-white font-medium">
          {activeClipId ? "Edit Clip Script" : "Write New Clip Script"}
        </h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              onClick={onToggleExamples}
              className="px-3 py-1 bg-theme-orange hover:bg-theme-orange-light text-white border-none rounded-md shadow-md flex items-center gap-2"
            >
              <Hand size={16} />
              <span className="font-medium text-sm">Click me for help</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click for prompt examples</p>
          </TooltipContent>
        </Tooltip>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="px-3 py-1 bg-theme-gray/30 hover:bg-theme-gray/50 text-white border-none rounded-md shadow-md flex items-center gap-2"
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
          <h3 className="text-sm font-medium text-white/80 mb-2">Avatar Speech</h3>
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
    </Card>
  );
};

export default ScriptEditor;
