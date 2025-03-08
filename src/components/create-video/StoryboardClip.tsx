
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface StoryboardClipProps {
  id: string;
  thumbnail: string;
  text: string;
  durationSeconds: number;
  isActive: boolean;
  onClipClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

const StoryboardClip = ({
  id,
  thumbnail,
  text,
  durationSeconds,
  isActive,
  onClipClick,
  onDeleteClick,
}: StoryboardClipProps) => {
  return (
    <div 
      className={`relative flex-shrink-0 cursor-pointer transition-all ${isActive ? 'border-2 border-theme-orange' : 'border border-white/10'}`}
      onClick={() => onClipClick(id)}
    >
      <div className="w-20 h-14 relative overflow-hidden rounded-lg bg-gradient-to-r from-red-800/90 to-red-600/70">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <img src={thumbnail} alt={`Clip ${id}`} className="w-full h-full object-cover opacity-70" />
        </div>
        <div className="absolute top-1 left-1 bg-red-900/80 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {id}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 h-5 w-5 bg-red-900/80 text-white rounded-full p-0 hover:bg-red-700"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(id);
          }}
        >
          <Trash size={10} />
        </Button>
      </div>
    </div>
  );
};

export default StoryboardClip;
