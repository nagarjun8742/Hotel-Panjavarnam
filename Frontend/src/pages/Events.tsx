import { motion } from "framer-motion";
import { Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { events } from "@/data/hotel-data";

const Events = () => (
  <div className="pt-20">
    <section className="py-28 px-6">
      <div className="container mx-auto">
        <SectionHeading
          subtitle="Venues"
          title="Events & Banquets"
          description="From intimate gatherings to grand celebrations, our versatile venues offer the perfect setting for every occasion."
        />
        <div className="space-y-12">
          {events.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-0 glass overflow-hidden hover:glow-gold-sm transition-all duration-500"
            >
              <div className="overflow-hidden">
                <img src={e.image} alt={e.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <h3 className="font-heading text-2xl text-foreground mb-2 font-normal">{e.name}</h3>
                <span className="flex items-center gap-1.5 text-sm text-gold/70 mb-5">
                  <Users size={15} strokeWidth={1.5} /> Up to {e.capacity} guests
                </span>
                <p className="text-muted-foreground leading-relaxed mb-6 text-[15px]">{e.description}</p>
                <div className="flex flex-wrap gap-2">
                  {e.features.map((f) => (
                    <span key={f} className="text-[11px] px-3 py-1 border border-border/40 text-muted-foreground tracking-wide">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Events;
