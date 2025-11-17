import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ModuleWrapper } from "@/components/ModuleWrapper";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Instructor from "./pages/Instructor";
import Admin from "./pages/Admin";
import CourseBasic from "./pages/CourseBasic";
import CourseAdvanced from "./pages/CourseAdvanced";
import CourseHolistic from "./pages/CourseHolistic";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente para scroll automático para o topo ao mudar de rota
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <ModuleWrapper>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/instructor" element={<Instructor />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/curso/massoterapia-basica" element={<CourseBasic />} />
            <Route path="/curso/massoterapia-avancada" element={<CourseAdvanced />} />
            <Route path="/curso/terapias-holisticas" element={<CourseHolistic />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ModuleWrapper>
);

export default App;