import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Wand2, RefreshCw, Loader2 } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
const AVATAR_IMAGES = [];
const SIMPLIFIED_CATEGORIES = [{
  id: "all",
  label: "All"
}, {
  id: "personal",
  label: "Personal"
}];
const INITIAL_GENERATED_AVATAR = null;
const AvatarSelection = () => {
  const [avatarImages, setAvatarImages] = useState(AVATAR_IMAGES);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAvatar, setGeneratedAvatar] = useState(INITIAL_GENERATED_AVATAR);
  const navigate = useNavigate();
  const handleAvatarSelect = (id: number) => {
    setSelectedAvatar(id);
  };
  const handleContinue = () => {
    navigate("/voice-selection");
  };
  const handleGenerateAvatar = () => {
    if (!promptText.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description for your avatar",
        variant: "destructive"
      });
      return;
    }
    setIsGenerating(true);
    setGeneratedAvatar(null);
    console.log("Generating avatar with prompt:", promptText);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedAvatar({
        id: "gen1",
        url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=800&fit=crop"
      });
      toast({
        title: "Avatar generated!",
        description: "Your avatar has been created successfully."
      });
    }, 3000);
  };
  const handleAcceptAvatar = (avatarId: string) => {
    if (!generatedAvatar) return;
    const newAvatar = {
      id: avatarImages.length + 1,
      url: generatedAvatar.url,
      alt: "Generated Avatar",
      name: `CUSTOM ${new Date().toLocaleDateString()}`,
      year: new Date().getFullYear().toString(),
      category: "personal"
    };
    setAvatarImages([...avatarImages, newAvatar]);
    setSelectedAvatar(newAvatar.id);
    setIsGenerateModalOpen(false);
    toast({
      title: "Avatar added",
      description: "The generated avatar has been added to your Personal collection."
    });
  };
  const handleRegenerateAvatar = () => {
    if (!promptText.trim()) return;
    setIsGenerating(true);
    console.log("Regenerating avatar with prompt:", promptText);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedAvatar({
        id: "gen" + Math.random().toString(36).substring(7),
        url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=800&fit=crop"
      });
      toast({
        title: "Avatar regenerated!",
        description: "Your new avatar is ready for review."
      });
    }, 3000);
  };
  const filteredAvatars = activeCategory === "all" ? avatarImages : avatarImages.filter(avatar => avatar.category === activeCategory);
  return <PageContainer>
      <div className="container px-4 py-6 relative bg-transparent min-h-screen">
        <div className="fixed top-24 right-8 z-10">
          <Button className="bg-theme-orange hover:bg-theme-orange-light text-white px-8" onClick={handleContinue}>
            Continue
          </Button>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center relative">
            <Button variant="ghost" onClick={() => navigate("/home")} className="absolute left-0 top-0 text-white">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl font-bold text-white">Choose Your Avatar</h1>
          </div>

          <div className="flex justify-center space-x-2 mb-8">
            {SIMPLIFIED_CATEGORIES.map(category => <Button key={category.id} onClick={() => setActiveCategory(category.id)} variant={activeCategory === category.id ? "default" : "outline"} className={`rounded-full px-6 transition-all ${activeCategory === category.id ? "bg-white text-black" : "bg-black/20 text-white border-white/20 hover:bg-black/40"}`}>
                {category.label}
              </Button>)}
            
            <Button onClick={() => setIsGenerateModalOpen(true)} variant="outline" className="rounded-full px-6 bg-theme-orange/90 text-white border-white/20 hover:bg-theme-orange">
              <Wand2 className="mr-2" size={16} />
              Generate New Avatar
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6 max-h-[65vh] overflow-y-auto no-scrollbar pb-12 scroll-smooth">
            {filteredAvatars.map(avatar => <Card key={avatar.id} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.03] border-0 bg-transparent ${selectedAvatar === avatar.id ? "ring-2 ring-white" : "hover:ring-1 hover:ring-white/60"}`}>
                <button className="w-full relative" onClick={() => handleAvatarSelect(avatar.id)} style={{
              aspectRatio: '3/4'
            }}>
                  <img src={avatar.url} alt={avatar.alt} className="w-full h-full object-cover rounded-lg" />
                  
                  
                  
                  {selectedAvatar === avatar.id && <div className="absolute top-3 right-3">
                      <div className="bg-theme-orange rounded-full w-8 h-8 flex items-center justify-center">
                        <Check size={16} className="text-white" />
                      </div>
                    </div>}
                </button>
              </Card>)}
          </div>
        </div>
      </div>

      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogContent className="sm:max-w-[900px] bg-gradient-to-br from-gray-900/95 to-black/95 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-white">Generate New Avatar</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Enter Your Prompt</h3>
              <Textarea value={promptText} onChange={e => setPromptText(e.target.value)} placeholder="Describe your avatar... (e.g., 'A professional woman with short dark hair and glasses in a business setting')" className="h-32 bg-gray-800/50 border-gray-700 text-white" disabled={isGenerating} />
              <Button onClick={isGenerating ? undefined : handleGenerateAvatar} className="w-full bg-theme-orange hover:bg-theme-orange-light" disabled={!promptText.trim() || isGenerating}>
                {isGenerating ? <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Generating...
                  </> : <>
                    <Wand2 className="mr-2" size={16} />
                    Generate Avatar
                  </>}
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Generated Avatar</h3>
              
              {isGenerating ? <div className="flex flex-col items-center justify-center h-[400px] bg-gray-800/30 rounded-lg">
                  <Loader2 className="animate-spin text-theme-orange h-12 w-12 mb-4" />
                  <p className="text-white">Creating your avatar...</p>
                </div> : !generatedAvatar ? <div className="flex flex-col items-center justify-center h-[400px] bg-gray-800/30 rounded-lg">
                  <p className="text-white text-center">
                    Your generated avatar will appear here.<br />
                    Enter a prompt and click "Generate Avatar".
                  </p>
                </div> : <div className="relative h-[400px]">
                  <img src={generatedAvatar.url} alt="Generated avatar" className="w-full rounded-lg object-cover h-full" />
                  <div className="absolute bottom-3 right-3 flex space-x-2">
                    <Button className="bg-gray-800/80 hover:bg-gray-700 text-white" size="sm" onClick={handleRegenerateAvatar}>
                      <RefreshCw size={14} className="mr-1" /> Regenerate
                    </Button>
                    <Button className="bg-theme-orange hover:bg-theme-orange-light" size="sm" onClick={() => handleAcceptAvatar(generatedAvatar.id)}>
                      Use Avatar
                    </Button>
                  </div>
                </div>}
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsGenerateModalOpen(false)} className="border-gray-700 text-gray-300" disabled={isGenerating}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>;
};
export default AvatarSelection;