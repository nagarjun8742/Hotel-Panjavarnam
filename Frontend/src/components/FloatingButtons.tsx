import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const FloatingButtons = () => (
  <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
    <motion.a
      href="https://wa.me/7598893363"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_-4px_#25D366] transition-shadow"
      aria-label="WhatsApp"
    >
      <MessageCircle size={22} className="text-white" />
    </motion.a>
    <motion.a
      href="tel:+917010688411"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-lg hover:glow-gold transition-shadow"
      aria-label="Call"
    >
      <Phone size={20} className="text-primary-foreground" />
    </motion.a>
  </div>
);

export default FloatingButtons;
