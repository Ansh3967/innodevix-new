import { Button } from "@/components/ui/button";
import logoMark from "@/assets/innodevix-mark.png";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/15">
      <nav className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-bold text-lg tracking-[0.2em] uppercase">
          <img src={logoMark} alt="Innodevix logo" className="w-9 h-9 object-contain" />
          <span className="text-gradient">Innodevix</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#projects" className="hover:text-primary transition-colors">Work</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <Button asChild size="sm" variant="hero">
          <a href="#contact">Get Started</a>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
