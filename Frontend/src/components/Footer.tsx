import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "../assets/logo.jpg";

const footerLinks = [
  { label: "Rooms", to: "/rooms" },
  { label: "Offers", to: "/offers" },
  { label: "Gallery", to: "/gallery" },
  { label: "Facilities", to: "/facilities" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="bg-secondary border-t border-border/40">
    <div className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
        <div>
          <img 
           src={logo} 
           alt="logo" 
           className="h-12 w-12 rounded-full object-cover border-2 border-gold"
         />
          <h3 className="font-heading text-xl tracking-[0.3em] text-gold mb-5">HOTEL PANCHAVARNAA</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A sanctuary of luxury where timeless elegance meets modern sophistication.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] tracking-[0.25em] uppercase text-foreground/30 mb-5 font-medium">Explore</h4>
          <div className="flex flex-col gap-3">
            {footerLinks.map((l) => (
              <Link key={l.label} to={l.to} className="text-sm text-muted-foreground hover:text-gold transition-colors duration-300">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] tracking-[0.25em] uppercase text-foreground/30 mb-5 font-medium">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2.5"><Phone size={14} className="text-gold/60" /> +91 7010688411</span>
            <span className="flex items-center gap-2.5"><Mail size={14} className="text-gold/60" /> hotelpanchavarnaa@gmail.com</span>
            <span className="flex items-center gap-2.5"><MapPin size={14} className="text-gold/60" /> 20/17-2 Kalavai Street, Near Saraswathi School & Temple Car Parking,Rameswram-623 526</span>
          </div>
        </div>
        <div>
          <h4 className="text-[11px] tracking-[0.25em] uppercase text-foreground/30 mb-5 font-medium">Follow Us</h4>
          <div className="flex gap-4">
            {[
              { label: "YouTube", href: "https://youtube.com", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
              { label: "Instagram", href: "https://instagram.com", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
              { label: "Facebook", href: "https://facebook.com", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
            ].map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-all duration-300" aria-label={social.label}>
                <svg width={16} height={16} fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
            <span>Check-in: 12:00 PM</span>
            <span>Check-out: 12:00 PM</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border/30 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/60">
        <span>© {new Date().getFullYear()} Hotel Panchavarnaa. All rights reserved.</span>
        <Link to="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
