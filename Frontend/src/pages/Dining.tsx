import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { restaurants } from "@/data/hotel-data";

const Dining = () => (
  <div className="pt-20">
    <section className="py-28 px-6">
      <div className="container mx-auto">
        <SectionHeading
          subtitle="Gastronomy"
          title="Explore Rameshwaram"
          description="Visit the most sacred and beautiful places near our hotel in Rameshwaram. "
        />
        <div className="space-y-20">
          {restaurants.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="overflow-hidden border border-border/40">
                  <img src={r.image} alt={r.name} loading="lazy" width={800} height={600} className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <span className="text-[11px] tracking-[0.3em] uppercase text-gold/70 font-medium">{r.cuisine}</span>
                <h3 className="font-heading text-3xl text-foreground mt-2 mb-5 font-normal">{r.name}</h3>
                <p className="text-muted-foreground leading-[1.8] mb-5 text-[15px]">{r.description}</p>
                <span className="text-sm text-gold/60">{r.hours}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Dining;
