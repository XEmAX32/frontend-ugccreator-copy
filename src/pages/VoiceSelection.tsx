import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Search, Star, Play, Pause, Volume2, X } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

// Mock data for voices
const AVAILABLE_VOICES = [{
  id: "aria",
  name: "Aria",
  voiceId: "9BWtsMINqrJLrRacOk9x",
  gender: "female",
  accent: "american",
  isFavorite: false,
  category: "professional"
}, {
  id: "roger",
  name: "Roger",
  voiceId: "CwhRBWXzGAHq8TQ4Fs17",
  gender: "male",
  accent: "british",
  isFavorite: true,
  category: "professional"
}, {
  id: "sarah",
  name: "Sarah",
  voiceId: "EXAVITQu4vr4xnSDxMaL",
  gender: "female",
  accent: "american",
  isFavorite: false,
  category: "casual"
}, {
  id: "laura",
  name: "Laura",
  voiceId: "FGY2WhTYpPnrIDTdsKH5",
  gender: "female",
  accent: "american",
  isFavorite: true,
  category: "casual"
}, {
  id: "charlie",
  name: "Charlie",
  voiceId: "IKne3meq5aSn9XLyUdCD",
  gender: "male",
  accent: "american",
  isFavorite: false,
  category: "casual"
}, {
  id: "george",
  name: "George",
  voiceId: "JBFqnCBsd6RMkjVDRZzb",
  gender: "male",
  accent: "british",
  isFavorite: false,
  category: "professional"
}, {
  id: "callum",
  name: "Callum",
  voiceId: "N2lVS1w4EtoT3dr4eOWO",
  gender: "male",
  accent: "british",
  isFavorite: false,
  category: "casual"
}, {
  id: "river",
  name: "River",
  voiceId: "SAz9YHcvj6GT2YYXdXww",
  gender: "nonbinary",
  accent: "american",
  isFavorite: false,
  category: "casual"
}, {
  id: "liam",
  name: "Liam",
  voiceId: "TX3LPaxmHKxFdv7VOQHJ",
  gender: "male",
  accent: "american",
  isFavorite: false,
  category: "professional"
}, {
  id: "charlotte",
  name: "Charlotte",
  voiceId: "XB0fDUnXU5powFXDhCwa",
  gender: "female",
  accent: "british",
  isFavorite: false,
  category: "professional"
}];

// Demo text for voice preview
const DEMO_TEXT = "Hello, I'm your AI presenter. I'll help you create engaging videos that captivate your audience.";
const VoiceSelection = () => {
  const [voices, setVoices] = useState(AVAILABLE_VOICES);
  const [selectedVoice, setSelectedVoice] = useState<string | null>("aria");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedVoiceDetails, setSelectedVoiceDetails] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  // Filter voices based on search query and active category
  const filteredVoices = voices.filter(voice => {
    const matchesSearch = voice.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || voice.category === activeCategory;
    const matchesTab = activeTab === "all" || activeTab === "favorites" && voice.isFavorite;
    return matchesSearch && matchesCategory && matchesTab;
  });

  // Handle voice selection
  const handleSelectVoice = (voiceId: string) => {
    setSelectedVoice(voiceId);
  };

  // Toggle favorite status of voice
  const toggleFavorite = (voiceId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setVoices(voices.map(voice => {
      if (voice.id === voiceId) {
        const newStatus = !voice.isFavorite;
        toast({
          title: newStatus ? "Added to favorites" : "Removed from favorites",
          description: `${voice.name} ${newStatus ? "added to" : "removed from"} your favorites.`
        });
        return {
          ...voice,
          isFavorite: newStatus
        };
      }
      return voice;
    }));
  };

  // Play voice sample
  const playVoiceSample = (voiceId: string, event: React.MouseEvent) => {
    event.stopPropagation();

    // In a real implementation, this would call an API to generate the speech
    // For demo purposes, we'll just simulate playing/stopping audio

    if (currentlyPlaying === voiceId) {
      // Stop playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setCurrentlyPlaying(null);
    } else {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Start playing new audio
      // In a real implementation, this would use the actual API to get voice samples
      console.log(`Playing voice sample for ${voiceId}`);
      setCurrentlyPlaying(voiceId);

      // Simulate audio playing and stopping after 3 seconds
      setTimeout(() => {
        if (currentlyPlaying === voiceId) {
          setCurrentlyPlaying(null);
        }
      }, 3000);
    }
  };

  // Show voice details
  const showVoiceDetails = (voice: any, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedVoiceDetails(voice);
    setIsInfoModalOpen(true);
  };

  // Navigate to create video page
  const handleContinue = () => {
    if (!selectedVoice) {
      toast({
        title: "Please select a voice",
        description: "You need to select a voice before continuing.",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, you would store the selected voice in state/context
    // before navigating to the next page
    console.log(`Selected voice: ${selectedVoice}`);
    navigate("/create-video");
  };
  return <PageContainer>
      <div className="container px-4 py-6 relative bg-transparent min-h-screen">
        <div className="fixed top-24 right-8 z-10">
          <Button className="bg-theme-orange hover:bg-theme-orange-light text-white px-8" onClick={handleContinue}>
            Continue
          </Button>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center relative">
            <Button variant="ghost" onClick={() => navigate("/avatar-selection")} className="absolute left-0 top-0 text-white">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl font-bold text-white">Choose Your Voice</h1>
          </div>

          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex items-center space-x-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-400" placeholder="Search voices..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-black/20">
                <TabsTrigger value="all" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  All Voices
                </TabsTrigger>
                <TabsTrigger value="favorites" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  Favorites
                </TabsTrigger>
              </TabsList>
            </Tabs>

            
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 max-h-[65vh] overflow-y-auto no-scrollbar pb-12 scroll-smooth">
            {filteredVoices.length === 0 ? <div className="col-span-full text-center py-10">
                <p className="text-white text-lg">No voices found with the current filters.</p>
              </div> : filteredVoices.map(voice => <Card key={voice.id} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.03] border-0 bg-black/20 ${selectedVoice === voice.id ? "ring-2 ring-white" : "hover:ring-1 hover:ring-white/60"}`} onClick={() => handleSelectVoice(voice.id)}>
                  <div className="p-4 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white text-lg font-semibold">{voice.name}</h3>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="bg-gray-700/50 text-white/90 text-xs px-2 py-0.5 rounded-full">
                            {voice.accent}
                          </span>
                          <span className="bg-gray-700/50 text-white/90 text-xs px-2 py-0.5 rounded-full">
                            {voice.gender}
                          </span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon" className={`text-white/80 hover:text-white ${voice.isFavorite ? 'text-yellow-400 hover:text-yellow-300' : ''}`} onClick={e => toggleFavorite(voice.id, e)}>
                        <Star size={18} fill={voice.isFavorite ? "currentColor" : "none"} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <Button variant="outline" size="sm" className="bg-gray-700/50 border-gray-600/50 text-white" onClick={e => playVoiceSample(voice.id, e)}>
                        {currentlyPlaying === voice.id ? <Pause size={16} /> : <Play size={16} />}
                        <span className="ml-1">{currentlyPlaying === voice.id ? "Stop" : "Preview"}</span>
                      </Button>
                      
                      
                    </div>
                    
                    {selectedVoice === voice.id && <div className="absolute top-3 right-3">
                        <div className="bg-theme-orange rounded-full w-6 h-6 flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      </div>}
                  </div>
                </Card>)}
          </div>
        </div>
      </div>

      {/* Voice detail modal */}
      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="bg-gradient-to-br from-gray-900/95 to-black/95 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {selectedVoiceDetails?.name} Voice
            </DialogTitle>
          </DialogHeader>
          
          {selectedVoiceDetails && <div className="mt-4 space-y-4">
              <div className="flex justify-center">
                <Button variant="outline" className="bg-gray-700/50 border-gray-600/50 text-white" onClick={e => playVoiceSample(selectedVoiceDetails.id, e)}>
                  {currentlyPlaying === selectedVoiceDetails.id ? <Pause size={18} className="mr-2" /> : <Volume2 size={18} className="mr-2" />}
                  {currentlyPlaying === selectedVoiceDetails.id ? "Stop Playing" : "Play Sample"}
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Gender</p>
                  <p className="text-white">{selectedVoiceDetails.gender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Accent</p>
                  <p className="text-white">{selectedVoiceDetails.accent}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Category</p>
                  <p className="text-white capitalize">{selectedVoiceDetails.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Voice ID</p>
                  <p className="text-white text-xs font-mono">{selectedVoiceDetails.voiceId}</p>
                </div>
              </div>
              
              <div className="space-y-1 mt-4">
                <p className="text-gray-400 text-sm">Sample Text</p>
                <p className="text-white bg-black/20 p-3 rounded-md italic">
                  "{DEMO_TEXT}"
                </p>
              </div>
            </div>}
        </DialogContent>
      </Dialog>
      
      {/* Hidden audio element for voice playback */}
      <audio ref={audioRef} className="hidden" />
    </PageContainer>;
};
export default VoiceSelection;