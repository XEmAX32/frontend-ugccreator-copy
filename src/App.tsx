
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import AvatarSelection from "./pages/AvatarSelection";
import VoiceSelection from "./pages/VoiceSelection";
import CreateVideo from "./pages/CreateVideo";
import NotFound from "./pages/NotFound";
import { ClerkProvider } from '@clerk/clerk-react'

const queryClient = new QueryClient();

const clerkFrontendApi = 'pk_test_d2VsY29tZWQtZGFuZS05LmNsZXJrLmFjY291bnRzLmRldiQ';


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ClerkProvider publishableKey={clerkFrontendApi} afterSignOutUrl="/">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Navigate to="/home" replace />} />
            <Route path="/avatar-selection" element={<AvatarSelection />} />
            <Route path="/voice-selection" element={<VoiceSelection />} />
            <Route path="/create-video" element={<CreateVideo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ClerkProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;