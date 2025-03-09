
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface GenerationProgressProps {
  isGenerating: boolean;
  progress: {
    value: number;
    max: number;
  } | null;
}

const GenerationProgress = ({ isGenerating, progress }: GenerationProgressProps) => {
  // Calculate percentage
  const percentage = progress ? Math.round((progress.value / progress.max) * 100) : 0;
  
  if (!isGenerating) return null;
  
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin text-theme-orange h-5 w-5" />
          <span className="text-white text-sm">Generating your avatar...</span>
        </div>
        <span className="text-white text-sm font-medium">{percentage}%</span>
      </div>
      
      <Progress 
        value={percentage} 
        className="h-2 w-full bg-gray-800/70"
      />
      
      <p className="text-xs text-gray-400 text-center">
        {progress 
          ? `Step ${progress.value} of ${progress.max}` 
          : "Connecting to server..."}
      </p>
    </div>
  );
};

export default GenerationProgress;
