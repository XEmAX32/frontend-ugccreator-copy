
import { Film, Video, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { VideoClip } from "@/types/video";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface VideoPreviewProps {
  activeClipId: string | null;
  clips: VideoClip[];
  totalDuration: number;
  maxDuration: number;
}

const VideoPreview = ({ activeClipId, clips, totalDuration, maxDuration }: VideoPreviewProps) => {
  const activeClip = activeClipId ? clips.find(c => c.id === activeClipId) : null;
  const activeClipIndex = activeClipId ? clips.findIndex(c => c.id === activeClipId) : -1;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const activeClipDuration = activeClip?.durationSeconds || 0;
  const displayDuration = activeClipId ? activeClipDuration : totalDuration;
  const progressPercentage = (currentTime / (activeClipId ? activeClipDuration : totalDuration)) * 100;

  return (
    <Card className="border-theme-gray/40 bg-theme-black/50 rounded-lg overflow-hidden h-full flex flex-col">
      {/* Video Preview Area */}
      <div className="relative flex-1 flex justify-center items-center p-4">
        {/* 9:16 Vertical Video Container */}
        <div className="relative aspect-[9/16] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] h-full max-h-[500px]">
          {/* Empty Preview Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {clips.length === 0 && (
              <div className="text-white/70">
                <Film size={48} className="mx-auto mb-4 text-theme-orange/50" />
                Add your first clip to begin creating your video
              </div>
            )}
          </div>
        </div>

        {/* Badge shown to the right of the video */}
        <div className="bg-black/80 px-3 py-1 rounded-full flex items-center gap-2 h-fit absolute top-4 right-4">
          <div className="w-5 h-5 rounded-full bg-theme-orange flex items-center justify-center">
            <Video size={12} className="text-white" />
          </div>
          <span className="text-xs font-medium text-white">
            {activeClipId ? `Clip ${activeClipIndex + 1}` : `Clip ${clips.length}`}
          </span>
        </div>
      </div>

      {/* Video Controls */}
      <div className="p-4 border-t border-theme-gray/20 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-full h-1 bg-theme-gray/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-theme-orange rounded-full"
              style={{ width: `${isNaN(progressPercentage) ? 0 : progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-theme-gray/20 hover:bg-theme-gray/30"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-theme-gray/20 hover:bg-theme-gray/30"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
            <span className="text-xs text-gray-400 min-w-14">
              {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')} / {Math.floor(displayDuration / 60)}:{(displayDuration % 60).toFixed(0).padStart(2, '0')}
            </span>
          </div>
          
          <div className="text-xs text-gray-400">
            {activeClipId ? `Editing clip ${activeClipIndex + 1} of ${clips.length}` : 
             clips.length > 0 ? `Preview of full video (${clips.length} clips)` : "No clips created yet"}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoPreview;
