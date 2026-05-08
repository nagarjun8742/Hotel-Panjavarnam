import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useApi } from "@/hooks/useApi";
import { getLocation } from "@/services/api";
import { getMaxListeners } from "events";

const Location = () => {
  const { data: location, loading } = useApi(getLocation);

  return (
    <div className="pt-20">
      <section className="py-28 px-6">
        <div className="container mx-auto">
          <SectionHeading subtitle="Find Us" title="Our Location" description="Situated in the heart of Manhattan, Hotel Panchavarnaa is your gateway to the city's finest experiences." />

          {loading ? (
            <div className="max-w-5xl mx-auto animate-pulse">
              <div className="aspect-video bg-muted mb-8" />
              <div className="h-4 bg-muted w-1/2 mx-auto" />
            </div>
          ) : location ? (
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border border-border/40 overflow-hidden mb-12"
              >
                <iframe
                  title="Hotel Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.4623429480503!2d79.31479797438105!3d9.292236784814179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266069776cbd9%3A0x5543ac8176ca530f!2sHOTEL%20PANCHAVARNAA!5e0!3m2!1sen!2sin!4v1775474647990!5m2!1sen!2sin" 
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "450px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
              >
                {[
                  { icon: MapPin, label: "Address", value: `${location.address}, ${location.city}` },
                  { icon: Phone, label: "Phone", value: location.phone },
                  { icon: Mail, label: "Email", value: location.email },
                  { icon: Globe, label: "Country", value: location.country },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="glass p-6 text-center hover:glow-gold-sm transition-all duration-500">
                    <Icon size={22} className="text-gold mx-auto mb-3" strokeWidth={1.5} />
                    <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold/70 mb-1.5 font-medium">{label}</h4>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Location;
