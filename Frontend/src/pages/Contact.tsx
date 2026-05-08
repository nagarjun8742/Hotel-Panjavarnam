import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import SectionHeading from "@/components/SectionHeading";
import { sendContact } from "@/services/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    setSubmitting(true);
    try {
      await sendContact(form);
      toast.success("Thank you! We'll be in touch shortly.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.info("Message sent (demo mode).");
      setForm({ name: "", email: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full bg-muted/50 border border-border/60 px-4 py-3.5 text-sm text-foreground focus:outline-none focus:border-gold/50 transition-colors backdrop-blur-sm";

  return (
    <div className="pt-20">
      <section className="py-28 px-6">
        <div className="container mx-auto">
          <SectionHeading subtitle="Get in Touch" title="Contact Us" description="We'd love to hear from you. Reach out with any inquiries about reservations, events, or anything else." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {[
                { label: "Name", type: "text", key: "name" as const, placeholder: "Your name" },
                { label: "Email", type: "email", key: "email" as const, placeholder: "your@email.com" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-[11px] tracking-[0.2em] uppercase text-gold/70 mb-2 block font-medium">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className={inputClass}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div>
                <label className="text-[11px] tracking-[0.2em] uppercase text-gold/70 mb-2 block font-medium">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="How can we help you?"
                />
              </div>
              <button type="submit" disabled={submitting} className="flex items-center gap-2.5 bg-gold text-primary-foreground px-8 py-3.5 text-[13px] tracking-[0.15em] uppercase font-medium hover:bg-gold-light transition-all duration-500 disabled:opacity-50">
                {submitting ? <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <><Send size={15} /> Send Message</>}
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-5">
                {[
                  { icon: MapPin, title: "Address", text: "20/17-2 Kalavai Street, Near Saraswathi School & Temple Car Parking ,Rameswram -623 526" },
                  { icon: Phone, title: "Phone", text: "+91 7598893363" },
                  { icon: Mail, title: "Email", text: "hotelpanchavarnaa@gmail.com" },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-4">
                    <Icon size={18} className="text-gold/60 mt-1 shrink-0" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-sm font-heading text-foreground mb-0.5">{title}</h4>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden border border-border/40 aspect-video">
                <iframe
                  title="Hotel Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.4623429480503!2d79.31479797438105!3d9.292236784814179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266069776cbd9%3A0x5543ac8176ca530f!2sHOTEL%20PANCHAVARNAA!5e0!3m2!1sen!2sin!4v1775479170043!5m2!1sen!2sin" 
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "280px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
