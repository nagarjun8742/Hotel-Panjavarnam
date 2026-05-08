import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useApi } from "@/hooks/useApi";
import { getVideos } from "@/services/api";

const Videos = () => {
  const { data: videos, loading } = useApi(getVideos);

  return (
    <div className="pt-20">
      <section className="py-28 px-6">
        <div className="container mx-auto">
          <SectionHeading subtitle="Visual Stories" title="Videos" description="Immerse yourself in the Aurelian experience through our cinematic collection." />

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : !videos?.length ? (
            <p className="text-center text-muted-foreground">No videos available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {videos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="glass overflow-hidden group hover:glow-gold-sm transition-all duration-500"
                >
                  <div className="aspect-video">
                    <iframe
                      src={video.videoUrl}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg text-foreground">{video.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Videos;
