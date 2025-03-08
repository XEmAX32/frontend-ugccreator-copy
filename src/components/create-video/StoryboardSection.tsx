
import { VideoClip } from "@/types/video";
import StoryboardClip from "./StoryboardClip";
import AddClipButton from "./AddClipButton";
import DurationIndicator from "./DurationIndicator";

interface StoryboardSectionProps {
  clips: VideoClip[];
  activeClipId: string | null;
  totalDuration: number;
  maxDuration: number;
  remainingDuration: number;
  onClipSelect: (id: string) => void;
  onClipDelete: (id: string) => void;
  onAddClip: () => void;
}

const StoryboardSection = ({
  clips,
  activeClipId,
  totalDuration,
  maxDuration,
  remainingDuration,
  onClipSelect,
  onClipDelete,
  onAddClip,
}: StoryboardSectionProps) => {
  return (
    <div className="mb-4 relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-white/80">Storyboard</h2>
        <div className="flex items-center gap-1">
          <DurationIndicator 
            totalDuration={totalDuration} 
            maxDuration={maxDuration} 
            remainingDuration={remainingDuration} 
          />
        </div>
      </div>
      
      <div className="relative">
        {/* Time markers */}
        <div className="absolute -bottom-6 left-0 text-xs text-gray-400">
          00:00
        </div>
        {/* Removed the right timestamp that was here */}
      </div>
      
      <div className="flex gap-3 overflow-x-auto py-2 storyboard no-scrollbar" style={{ minHeight: '60px' }}>
        {clips.map(clip => (
          <StoryboardClip
            key={clip.id}
            id={clip.id}
            thumbnail={clip.thumbnail}
            text={clip.text}
            durationSeconds={clip.durationSeconds}
            isActive={activeClipId === clip.id}
            onClipClick={onClipSelect}
            onDeleteClick={onClipDelete}
          />
        ))}

        {/* Add new clip button */}
        {remainingDuration > 0 && (
          <AddClipButton onClick={onAddClip} />
        )}
      </div>
    </div>
  );
};

export default StoryboardSection;
