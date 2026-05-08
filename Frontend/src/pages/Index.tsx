import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car,Clock, Sparkles, Wifi, Star, Quote, ChevronLeft, ChevronRight, CloudSun } from "lucide-react";
import heroImg from "@/assets/hero-hotel.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import diningImg from "@/assets/dining.jpg";
import banquetImg from "@/assets/banquet.jpg";
import kovilImg from "@/assets/kovil.jpg";
import beachImg from "@/assets/beach.jpg";
import panbanImg from "@/assets/panban.jpg";
import SectionHeading from "@/components/SectionHeading";
import RoomCard from "@/components/RoomCard";
import ExploreButton from "@/components/ExploreButton";
import { useApi } from "@/hooks/useApi";
import { fallbackRooms, createBooking } from "@/services/api";
import { toast } from "sonner";

const heroSlides = [
  { image: heroImg, title: "Welcome to Hotel Panchavarnaa", subtitle: "Where comfort and hospitality meet in the heart of Rameshwaram" },
  { image: roomSuite, title: "Comfortable Rooms", subtitle: "Relax in spacious AC and Non-AC rooms designed for a peaceful stay" },
  { image: diningImg, title: "24/7 Room Service", subtitle: "Enjoy quick and reliable room service anytime during your stay" },
  { image: banquetImg, title: "24/7 Front Desk Support", subtitle: "Friendly assistance and seamless check-in for all our guests" },
];

const amenities = [
  { icon: Car, label: "Free Parking" },
  { icon: Clock, label: "24/7" },
  { icon: Sparkles, label: "Luxury Spa" },
  { icon: Wifi, label: "High-Speed Wi-Fi" },
];

const testimonials = [
  { name: "Alexandra M.", role: "Business Traveler", quote: "An extraordinary experience from the moment we arrived. The attention to detail and impeccable service made our anniversary truly unforgettable." },
  { name: "James & Sarah K.", role: "Honeymoon", quote: "The Royal Suite exceeded every expectation. Waking up to that panoramic view with breakfast served by our butler — pure magic." },
  { name: "David R.", role: "Corporate Event", quote: "We hosted our annual gala in The Grand Ballroom and it was flawless. The events team handled every detail with precision and grace." },
];

const restaurants = [
  { id: "1", name: "Ramanathaswamy Temple", cuisine: "Holy Place", image: kovilImg, hours: "6:00 PM – 11:00 PM" },
  { id: "2", name: "Dhanushkodi Beach", cuisine: "Scenic Beach", image: beachImg, hours: "12:00 PM – 10:30 PM" },
  { id: "3", name: "Pamban Bridge", cuisine: "Iconic Landmark", image: panbanImg, hours: "10:00 AM – 12:00 AM" },
];

const formatDate = () => {
  const now = new Date();
  return now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [temperature] = useState("24°C");

  const next = useCallback(() => setCurrent((c) => (c + 1) % heroSlides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={heroSlides[current].image}
          alt={heroSlides[current].title}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Date & Weather */}
      <div className="absolute top-24 left-6 md:left-12 z-10 text-white/60">
        <p className="text-[11px] tracking-[0.2em] uppercase font-medium">{formatDate()}</p>
        <p className="text-[11px] tracking-[0.15em] flex items-center gap-1.5 mt-1">
          <CloudSun size={13} className="text-gold" /> {temperature} — Rameswram
        </p>
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] tracking-[0.5em] uppercase text-gold/80 mb-5 block font-medium">Hotel Panchavarnaa</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-normal text-white mb-6 tracking-wide">
              {heroSlides[current].title}
            </h1>
            <p className="text-base text-white/60 mb-8 max-w-md mx-auto font-light leading-relaxed">
              {heroSlides[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-3 mb-8">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[2px] transition-all duration-500 ${i === current ? "w-10 bg-gold" : "w-5 bg-white/20"}`}
            />
          ))}
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 md:left-8 z-10 text-white/30 hover:text-gold transition-colors">
        <ChevronLeft size={32} strokeWidth={1} />
      </button>
      <button onClick={next} className="absolute right-4 md:right-8 z-10 text-white/30 hover:text-gold transition-colors">
        <ChevronRight size={32} strokeWidth={1} />
      </button>
    </section>
  );
};

const BookingForm = () => {
  const [form, setForm] = useState({ checkin: "", checkout: "", adults: "2", children: "0", promoCode: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.checkin || !form.checkout) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    setSubmitting(true);
    try {
      await createBooking({ name: "", email: "", checkin: form.checkin, checkout: form.checkout, guests: parseInt(form.adults) + parseInt(form.children), promoCode: form.promoCode || undefined });
      toast.success("Booking request submitted!");
    } catch {
      toast.info("Booking submitted (demo mode).");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full bg-muted/50 border border-border/60 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold/50 transition-colors backdrop-blur-sm";

  return (
    <section className="py-16 px-6 -mt-20 relative z-20">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-8 md:p-10 glow-gold-sm"
        >
          <h3 className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6 font-medium text-center">Reserve Your Stay</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
            <div className="flex flex-col">
              <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-medium">Check-in</label>
              <input type="date" value={form.checkin} onChange={(e) => setForm({ ...form, checkin: e.target.value })} className={inputClass} />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-medium">Check-out</label>
              <input type="date" value={form.checkout} onChange={(e) => setForm({ ...form, checkout: e.target.value })} className={inputClass} />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-medium">Adults</label>
              <select value={form.adults} onChange={(e) => setForm({ ...form, adults: e.target.value })} className={inputClass}>
                {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-medium">Children</label>
              <select value={form.children} onChange={(e) => setForm({ ...form, children: e.target.value })} className={inputClass}>
                {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n} Child{n !== 1 ? "ren" : ""}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-medium">Promo Code</label>
              <input type="text" placeholder="Optional" value={form.promoCode} onChange={(e) => setForm({ ...form, promoCode: e.target.value })} className={inputClass} />
            </div>
            <div className="flex items-end">
              <button onClick={handleSubmit} disabled={submitting} className="w-full py-2.5 bg-gold text-primary-foreground text-[12px] tracking-[0.15em] uppercase font-medium hover:bg-gold-light transition-all duration-500 disabled:opacity-50 glow-gold-sm">
                {submitting ? <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : "Book Now"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Index = () => {
  const rooms  = fallbackRooms;

  return (
    <div>
      <HeroSlider />
      <BookingForm />

      {/* About */}
      <section className="py-28 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <SectionHeading subtitle="Our Story" title="A Legacy of Luxury" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-muted-foreground leading-[1.9] text-[15px]">
            Nestled in the heart of the city, Hotel Panchavarnaa has been the gold standard of hospitality since 1928. Every detail — from the hand-laid marble floors to the bespoke aromatherapy in each corridor — has been curated to transport our guests into a world of refined indulgence. Our philosophy is simple: luxury should feel effortless.
          </motion.p>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-28 px-6 bg-secondary">
        <div className="container mx-auto">
          <SectionHeading subtitle="Accommodations" title="Our Finest Rooms" description="Each room is a masterpiece of design, offering an intimate retreat with every modern comfort." />
          {rooms && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
            </div>
          )}
          <div className="text-center mt-14">
            <ExploreButton to="/rooms" label="View All Rooms" />
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-28 px-6">
        <div className="container mx-auto">
          <SectionHeading subtitle="Experiences" title="World-Class Amenities" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-3xl mx-auto">
            {amenities.map(({ icon: Icon, label }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }} className="flex flex-col items-center gap-5 group">
                <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold/50 transition-all duration-500 group-hover:glow-gold-sm">
                  <Icon size={26} className="text-gold/70 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <span className="text-[13px] tracking-wider text-muted-foreground">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Preview */}
      <section className="py-28 px-6 bg-secondary">
        <div className="container mx-auto">
          <SectionHeading subtitle="Gastronomy" title="Explore Rameshwaram" description="Visit the most scred and beautiful places near our hotel in Rameshwaram." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {restaurants.map((r) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass overflow-hidden group hover:glow-gold-sm transition-all duration-500">
                <div className="overflow-hidden aspect-[4/3]">
                  <img src={r.image} alt={r.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-7">
                  <span className="text-[11px] tracking-[0.25em] uppercase text-gold/70 font-medium">{r.cuisine}</span>
                  <h3 className="font-heading text-xl text-foreground mt-1.5 mb-2 font-normal">{r.name}</h3>
                  <p className="text-sm text-muted-foreground">{r.hours}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-14">
            <ExploreButton to="/dining" label="Explore Dining" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-6">
        <div className="container mx-auto">
          <SectionHeading subtitle="Guest Voices" title="What Our Guests Say" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }} className="glass p-9 hover:glow-gold-sm transition-all duration-500">
                <Quote size={20} className="text-gold/20 mb-5" />
                <p className="text-foreground/70 italic leading-[1.8] mb-7 text-[15px]">"{t.quote}"</p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, j) => <Star key={j} size={11} className="fill-gold/70 text-gold/70" />)}
                </div>
                <span className="text-sm font-heading text-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground block mt-0.5">{t.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
