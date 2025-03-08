
import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DurationIndicatorProps {
  totalDuration: number;
  maxDuration: number;
  remainingDuration: number;
}

const DurationIndicator = ({ totalDuration, maxDuration, remainingDuration }: DurationIndicatorProps) => {
  return (
    <div className="flex items-center gap-1">
      <Progress value={(totalDuration / maxDuration) * 100} className="w-32 h-2 bg-theme-gray/30" />
      <span className="text-xs text-white/60">{totalDuration.toFixed(1)}s / {maxDuration}s</span>
    </div>
  );
};

export default DurationIndicator;
