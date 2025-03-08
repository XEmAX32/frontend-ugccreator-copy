
import { Plus } from "lucide-react";

interface AddClipButtonProps {
  onClick: () => void;
}

const AddClipButton = ({ onClick }: AddClipButtonProps) => {
  return (
    <div 
      className="w-20 h-14 flex-shrink-0 rounded-lg flex items-center justify-center cursor-pointer bg-yellow-600/70 hover:bg-yellow-500/80 transition-colors border border-yellow-500/30"
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        <Plus size={20} className="text-white" />
      </div>
    </div>
  );
};

export default AddClipButton;
