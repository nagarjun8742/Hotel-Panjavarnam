import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import type { Room } from "@/services/api";

const RoomCard = ({ room }: { room: Room }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="group glass overflow-hidden hover:glow-gold-sm transition-all duration-500"
  >
    <div className="relative overflow-hidden aspect-[4/3]">
      <img src={room.image} alt={room.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
      <div className="absolute top-4 right-4 bg-black/70 px-4 py-2 text-white font-bold text-lg">
        ₹{room.price}<span className="text-xs text-muted-foreground">/Day</span>
      </div>
    </div>
    <div className="p-7">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-xl text-foreground font-normal">{room.name}</h3>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users size={13} /> {room.capacity}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{room.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {room?.features?.map((f) => (
          <span key={f} className="text-[11px] px-3 py-1 border border-border/40 text-muted-foreground tracking-wide">
            {f}
          </span>
        ))}
      </div>
      
      <Link to={'/booking?type=${room.name}'} className="block w-full py-3 border border-gold/60 text-gold text-[13px] tracking-[0.15em] uppercase text-center hover:bg-gold hover:text-primary-foreground transition-all duration-500">
        Book Now
      </Link>
    </div>
  </motion.div>
);

export default RoomCard;
