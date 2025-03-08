
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useState } from "react";

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
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <div 
        className={`relative flex-shrink-0 cursor-pointer transition-all ${isActive ? 'border-2 border-theme-orange' : 'border border-white/10'}`}
        onClick={() => onClipClick(id)}
      >
        <div className="w-20 h-14 relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-800/90 to-gray-600/70">
          <img src={thumbnail} alt={`Clip ${id}`} className="w-full h-full object-cover" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-5 w-5 bg-gray-900/80 text-white rounded-full p-0 hover:bg-red-700"
            onClick={(e) => {
              e.stopPropagation();
              setConfirmDelete(true);
            }}
          >
            <Trash size={10} />
          </Button>
        </div>
      </div>

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this clip?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="ghost" 
              onClick={() => setConfirmDelete(false)}
              className="text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                onDeleteClick(id);
                setConfirmDelete(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoryboardClip;
