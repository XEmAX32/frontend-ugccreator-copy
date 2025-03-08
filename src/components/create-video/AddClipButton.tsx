
import { Plus } from "lucide-react";

interface AddClipButtonProps {
  onClick: () => void;
}

const AddClipButton = ({ onClick }: AddClipButtonProps) => {
  return (
    <div 
      className="w-24 h-16 flex-shrink-0 border border-dashed border-theme-gray/40 rounded-md flex items-center justify-center cursor-pointer bg-theme-black/40 hover:bg-theme-black/60 transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <Plus size={18} className="text-theme-orange" />
        <span className="text-[9px] text-white/70 mt-1">Add Clip</span>
      </div>
    </div>
  );
};

export default AddClipButton;
