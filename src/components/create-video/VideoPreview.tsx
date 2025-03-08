import { Film, Video, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { VideoClip } from "@/types/video";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VideoPreviewProps {
  activeClipId: string | null;
  clips: VideoClip[];
  totalDuration: number;
  maxDuration: number;
  onDownload?: () => void;
  isFullscreen?: boolean;
}

const VideoPreview = ({ 
  activeClipId, 
  clips, 
  totalDuration, 
  maxDuration,
  onDownload,
  isFullscreen = false
}: VideoPreviewProps) => {
  const activeClip = activeClipId ? clips.find(c => c.id === activeClipId) : null;
  const activeClipIndex = activeClipId ? clips.findIndex(c => c.id === activeClipId) : -1;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (!isPlaying || !isFullscreen || clips.length === 0) return;
    
    let clipStartTime = 0;
    for (let i = 0; i < currentClipIndex; i++) {
      clipStartTime += clips[i].durationSeconds;
    }
    
    const currentClipDuration = clips[currentClipIndex]?.durationSeconds || 0;
    
    const timer = setInterval(() => {
      setCurrentTime(prevTime => {
        const newTime = prevTime + 0.1;
        
        if (isFullscreen && newTime >= clipStartTime + currentClipDuration) {
          if (currentClipIndex < clips.length - 1) {
            setCurrentClipIndex(prevIndex => prevIndex + 1);
          } else {
            setIsPlaying(false);
            return clipStartTime + currentClipDuration;
          }
        }
        
        return newTime;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, [isPlaying, isFullscreen, clips, currentClipIndex]);

  useEffect(() => {
    setCurrentTime(0);
    setCurrentClipIndex(0);
    setIsPlaying(false);
  }, [isFullscreen, activeClipId]);

  const activeClipDuration = activeClip?.durationSeconds || 0;
  const displayDuration = activeClipId ? activeClipDuration : totalDuration;
  const progressPercentage = (currentTime / (activeClipId ? activeClipDuration : totalDuration)) * 100;

  const currentDisplayClip = isFullscreen ? clips[currentClipIndex] : activeClip;

  const containerClasses = isFullscreen 
    ? "border-none bg-theme-black rounded-lg overflow-hidden h-full flex flex-col"
    : "border-theme-gray/40 bg-theme-black/50 rounded-lg overflow-hidden h-full flex flex-col";

  return (
    <Card className={containerClasses}>
      <div
        className="relative flex-1 flex justify-center items-center p-4"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <div className={`relative aspect-[9/16] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] ${
          isFullscreen ? 'h-[85vh] max-h-[85vh]' : 'h-full max-h-[500px]'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            {clips.length === 0 ? (
              <div className="text-white/70">
                <Film size={48} className="mx-auto mb-4 text-theme-orange/50" />
                Add your first clip to begin creating your video
              </div>
            ) : (
              <div className="text-white/90 text-center p-4">
                <div className="text-lg font-medium mb-2">
                  {currentDisplayClip?.text || ""}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`p-4 border-t border-theme-gray/20 flex flex-col gap-2 ${isPlaying && !showControls ? 'opacity-0 transition-opacity' : 'opacity-100'}`}>
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
            {isFullscreen 
              ? `Full video preview (${clips.length} clips)` 
              : activeClipId 
                ? `Editing clip ${activeClipIndex + 1} of ${clips.length}` 
                : clips.length > 0 
                  ? `Preview of full video (${clips.length} clips)` 
                  : "No clips created yet"}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoPreview;
