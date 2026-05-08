import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileText, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/rooms", label: "Rooms" },
  { to: "/offers", label: "Offers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/videos", label: "Videos" },
  { to: "/facilities", label: "Facilities" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-[0_1px_30px_-6px_hsl(var(--gold)/0.08)] border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
       <Link to="/" className="flex items-center gap-3 font-heading text-2xl tracking-[0.2em] text-gold">
         <img 
           src={logo} 
           alt="logo" 
           className="h-12 w-12 rounded-full object-cover border-2 border-gold"
         />
         HOTEL PANCHAVARNAA
       </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[12px] tracking-[0.18em] uppercase transition-colors duration-300 hover:text-gold ${
                location.pathname === link.to ? "text-gold" : "text-foreground/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="lg:hidden text-foreground/70 hover:text-gold transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border/40 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-5 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[13px] tracking-[0.2em] uppercase transition-colors hover:text-gold ${
                    location.pathname === link.to ? "text-gold" : "text-foreground/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="w-8 h-[1px] bg-border my-2" />
              <Link
                to="/terms"
                className="text-[12px] tracking-[0.15em] uppercase text-foreground/30 hover:text-gold transition-colors flex items-center gap-2"
              >
                <FileText size={13} /> Terms & Conditions
              </Link>
              <Link
                to="/admin"
                className="text-[12px] tracking-[0.15em] uppercase text-foreground/30 hover:text-gold transition-colors flex items-center gap-2"
              >
                <Shield size={13} /> Admin Panel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
