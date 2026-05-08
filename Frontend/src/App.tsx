import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import Dining from "./pages/Dining";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Offers from "./pages/Offers";
import Gallery from "./pages/Gallery";
import Videos from "./pages/Videos";
import Facilities from "./pages/Facilities";
import Location from "./pages/Location";
import Terms from "./pages/Terms";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/location" element={<Location />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <AnimatedRoutes />
        <Footer />
        <FloatingButtons />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
