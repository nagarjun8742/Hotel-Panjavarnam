import { motion } from "framer-motion";
import { Wifi, Compass, UtensilsCrossed, Clock, Sparkles, Car } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useApi } from "@/hooks/useApi";
import { getFacilities } from "@/services/api";

const iconMap: Record<string, React.ElementType> = {
  Wifi, Compass, UtensilsCrossed, Clock, Sparkles, Car,
};

const Facilities = () => {
  const { data: facilities, loading } = useApi(getFacilities);

  return (
    <div className="pt-20">
      <section className="py-28 px-6">
        <div className="container mx-auto">
          <SectionHeading subtitle="Amenities" title="World-Class Facilities" description="Every detail at Aurelian is designed to exceed your expectations." />

          {loading ? (
            <LoadingSkeleton count={8} />
          ) : !facilities?.length ? (
            <p className="text-center text-muted-foreground">No facilities listed.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {facilities.map((facility, i) => {
                const Icon = iconMap[facility.icon] || Sparkles;
                return (
                  <motion.div
                    key={facility.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="glass p-8 text-center group hover:glow-gold-sm transition-all duration-500"
                  >
                    <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-5 group-hover:border-gold/50 group-hover:glow-gold-sm transition-all duration-500">
                      <Icon size={24} className="text-gold/70 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-lg text-foreground mb-2">{facility.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{facility.description}</p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Facilities;
