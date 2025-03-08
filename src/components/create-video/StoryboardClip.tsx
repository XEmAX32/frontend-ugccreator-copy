
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
      className={`relative flex-shrink-0 cursor-pointer transition-all ${isActive ? 'ring-2 ring-theme-orange scale-105' : 'hover:scale-102'}`}
      onClick={() => onClipClick(id)}
    >
      <div className="w-24 h-16 relative overflow-hidden rounded-md bg-theme-black/60 border border-theme-gray/30">
        <img src={thumbnail} alt={`Clip ${id}`} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] p-1 truncate">
          {text.substring(0, 20)}...
        </div>
        <div className="absolute top-1 right-1 bg-black/70 text-white text-[8px] px-1 rounded">
          {durationSeconds}s
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -top-2 -right-2 h-5 w-5 bg-red-500/90 text-white rounded-full p-0 hover:bg-red-600"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(id);
        }}
      >
        <Trash size={11} />
      </Button>
    </div>
  );
};

export default StoryboardClip;
