
import { FormEvent } from "react";
import { Film, Hand, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        <Textarea
          placeholder={activeClipId 
            ? "Edit the script for this clip..." 
            : "Write the script for your new clip..."}
          className="min-h-[300px] resize-none bg-transparent border-theme-gray-light/30 focus:border-theme-orange text-white"
          value={promptText || clipText || ""}
          onChange={(e) => onPromptChange(e.target.value)}
        />
        
        <div className="flex justify-between mt-4">
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
              disabled={!promptText.trim() || remainingDuration <= 0}
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
