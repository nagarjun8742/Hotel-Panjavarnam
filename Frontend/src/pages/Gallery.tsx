import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useApi } from "@/hooks/useApi";
import { getGallery } from "@/services/api";

const Gallery = () => {
  const { data: images, loading } = useApi(getGallery);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(images?.map((img) => img.category) || [])];
  const filtered = filter === "All" ? images : images?.filter((img) => img.category === filter);

  const navigate = (dir: number) => {
    if (lightbox === null || !filtered) return;
    setLightbox((lightbox + dir + filtered.length) % filtered.length);
  };

  return (
    <div className="pt-20">
      <section className="py-28 px-6">
        <div className="container mx-auto">
          <SectionHeading subtitle="Visual Journey" title="Gallery" description="Explore the beauty and elegance of Hotel Panchavarnaa through our curated collection." />

          <div className="flex justify-center gap-4 mb-14 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[12px] tracking-[0.15em] uppercase px-5 py-2 border transition-all duration-300 ${
                  filter === cat
                    ? "border-gold bg-gold text-primary-foreground"
                    : "border-border/60 text-muted-foreground hover:border-gold/50 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : !filtered?.length ? (
            <p className="text-center text-muted-foreground">No images available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="relative overflow-hidden cursor-pointer group aspect-[4/3]"
                  onClick={() => setLightbox(i)}
                >
                  <img src={img.imageUrl} alt={img.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end">
                    <span className="text-white text-sm px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                      {img.caption}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white/80 hover:text-white">
              <X size={28} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate(-1); }} className="absolute left-4 md:left-8 text-white/60 hover:text-white">
              <ChevronLeft size={36} />
            </button>
            <img
              src={filtered[lightbox].imageUrl}
              alt={filtered[lightbox].caption}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); navigate(1); }} className="absolute right-4 md:right-8 text-white/60 hover:text-white">
              <ChevronRight size={36} />
            </button>
            <p className="absolute bottom-6 text-white/70 text-sm">{filtered[lightbox].caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
