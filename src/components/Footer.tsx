import logoMark from "@/assets/innodevix-mark.png";

const Footer = () => (
  <footer className="border-t border-primary/15 py-10 relative">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2 font-semibold text-foreground uppercase tracking-wider">
        <img src={logoMark} alt="Innodevix" className="w-7 h-7 object-contain" />
        Innodevix
      </div>
      <p>© {new Date().getFullYear()} Innodevix · Automation + Creativity</p>
      <div className="flex gap-5">
        <a href="#about" className="hover:text-primary transition-colors">About</a>
        <a href="#services" className="hover:text-primary transition-colors">Services</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;
