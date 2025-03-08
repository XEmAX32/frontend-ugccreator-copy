
import { Film, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { VideoClip } from "@/types/video";

interface VideoPreviewProps {
  activeClipId: string | null;
  clips: VideoClip[];
  totalDuration: number;
  maxDuration: number;
}

const VideoPreview = ({ activeClipId, clips, totalDuration, maxDuration }: VideoPreviewProps) => {
  const activeClip = activeClipId ? clips.find(c => c.id === activeClipId) : null;
  const activeClipIndex = activeClipId ? clips.findIndex(c => c.id === activeClipId) : -1;

  return (
    <Card className="border-theme-gray/40 bg-theme-black/50 rounded-lg overflow-hidden h-full min-h-[400px] flex flex-col">
      {/* Video Preview Area */}
      <div className="relative flex-1 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] overflow-hidden">
        {/* Avatar Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/80 px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-theme-orange flex items-center justify-center">
              <Video size={12} className="text-white" />
            </div>
            <span className="text-xs font-medium text-white">
              {activeClipId ? `${activeClipIndex + 1}` : "Full Video"}
            </span>
          </div>
        </div>

        {/* Preview Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center w-full px-8">
            {activeClipId && activeClip ? (
              <h2 className="text-2xl font-bold">
                <span className="text-white">{activeClip.text.split(' ').slice(0, 3).join(' ').toUpperCase()} </span>
                <span className="text-theme-orange">{activeClip.text.split(' ').slice(3, 4).join(' ').toUpperCase()}</span>
                <br />
                <span className="text-white">{activeClip.text.split(' ').slice(4, 8).join(' ').toUpperCase()}</span>
              </h2>
            ) : clips.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold">
                  <span className="text-white">FULL VIDEO</span>
                  <span className="text-theme-orange"> PREVIEW</span>
                </h2>
                <div className="flex flex-col gap-2 mt-4">
                  {clips.map((clip, index) => (
                    <div key={clip.id} className="text-sm text-left p-2 border border-theme-gray/20 rounded bg-black/40">
                      <div className="text-theme-orange text-xs font-medium mb-1">{index + 1} - {clip.durationSeconds}s</div>
                      <div className="text-white/80 text-xs truncate">{clip.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-white/70">
                <Film size={48} className="mx-auto mb-4 text-theme-orange/50" />
                Add your first clip to begin creating your video
              </div>
            )}
            {!activeClipId && clips.length === 0 && (
              <div className="mt-2 text-xs text-gray-400">
                Your video clips will appear here
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="p-4 border-t border-theme-gray/20 flex justify-between items-center">
        <div className="text-xs text-gray-400">
          {activeClipId ? `Editing clip ${activeClipIndex + 1} of ${clips.length}` : 
           clips.length > 0 ? `Preview of full video (${clips.length} clips)` : "No clips created yet"}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1 bg-theme-gray/30 rounded-full">
            <div 
              className="h-full bg-theme-orange rounded-full"
              style={{ width: `${clips.length ? (activeClipId ? 
                ((clips.find(c => c.id === activeClipId)?.durationSeconds || 0) / maxDuration) * 100 : 
                (totalDuration / maxDuration) * 100) : 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoPreview;
