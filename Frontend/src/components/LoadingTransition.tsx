import { AnimatePresence, motion } from "framer-motion";

const LoadingTransition = ({ isLoading }: { isLoading: boolean }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-background/90 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingTransition;
