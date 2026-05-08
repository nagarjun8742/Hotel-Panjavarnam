import { motion } from "framer-motion";
import { Tag, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useApi } from "@/hooks/useApi";
import { getOffers } from "@/services/api";

const Offers = () => {
  const { data: offers, loading } = useApi(getOffers);

  return (
    <div className="pt-20">
      <section className="py-28 px-6">
        <div className="container mx-auto">
          <SectionHeading subtitle="Special Offers" title="Exclusive Privileges" description="Take advantage of our curated offers designed to elevate your stay at Aurelian." />

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : !offers?.length ? (
            <p className="text-center text-muted-foreground">No offers available at this time.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {offers.map((offer, i) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="glass overflow-hidden group hover:glow-gold-sm transition-all duration-500"
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img src={offer.image} alt={offer.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />
                    <div className="absolute top-4 right-4 bg-gold text-primary-foreground px-4 py-2 font-heading text-lg">
                      {offer.discount}% OFF
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="font-heading text-xl text-foreground mb-3">{offer.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{offer.description}</p>
                    <div className="flex items-center gap-4 mb-5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Tag size={13} className="text-gold" /> {offer.code}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={13} className="text-gold" /> Until {offer.validUntil}</span>
                    </div>
                    <Link to="/booking" className="flex items-center gap-2 text-gold text-[13px] tracking-[0.15em] uppercase hover:gap-3 transition-all duration-300">
                      Book with Offer <ArrowRight size={14} />
                    </Link>
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

export default Offers;
