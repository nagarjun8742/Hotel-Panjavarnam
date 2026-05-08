import { motion } from "framer-motion";

interface Props {
  subtitle?: string;
  title: string;
  description?: string;
  className?: string;
}

const SectionHeading = ({ subtitle, title, description, className = "" }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className={`text-center mb-20 ${className}`}
  >
    {subtitle && (
      <span className="text-[11px] tracking-[0.35em] uppercase text-gold mb-4 block font-medium">{subtitle}</span>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-normal text-foreground mb-5 leading-tight">{title}</h2>
    {description && (
      <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-[15px]">{description}</p>
    )}
    <div className="w-12 h-[1px] bg-gold/40 mx-auto mt-8" />
  </motion.div>
);

export default SectionHeading;
