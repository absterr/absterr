'use client';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navItems = ['About', 'Projects', 'Contact'];

const Navbar = () => {
  const [active, setActive] = useState('home');
  const [isOpen, setOpen] = useState(false);

  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.5, // SECTION IS AT LEAST 50% VISIBLE
      }
    );

    sections.forEach((section) => observer.observe(section));
    const handleScrollTop = () => {
      if (window.scrollY < window.innerHeight * 0.2) {
        setActive('home');
      }
    };

    window.addEventListener('scroll', handleScrollTop);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, []);

  return (
    <nav className="fixed top-10 w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl z-50">
      <div
        className={cn(
          'bg-background/20 backdrop-blur-sm border border-foreground/10',
          isOpen ? 'rounded-4xl' : 'rounded-full'
        )}
      >
        <div className="px-4 py-2 md:px-6 md:py-4 lg:px-8 lg:py-5 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <ThemeToggle />
            <button
              className="text-sm md:text-md lg:text-lg text-foreground hover:cursor-pointer"
              onClick={() => handleNavClick('home')}
            >
              ABSTERR.DEV
            </button>
          </div>

          <div className="hidden md:flex gap-7">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className={`text-xs cursor-pointer font-semibold tracking-wide transition-all ${
                  active === item.toLowerCase()
                    ? 'text-foreground border-b-2 border-teal-500'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <motion.button
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(!isOpen)}
            className="md:hidden hover:bg-transparent"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      handleNavClick(item.toLowerCase());
                      setOpen(false);
                    }}
                    className={`block w-full text-left text-sm font-semibold tracking-wide py-2 transition-all ${
                      active === item.toLowerCase()
                        ? 'text-foreground border-b-2 border-teal-500 pl-3'
                        : 'text-foreground/60 hover:text-foreground pl-2'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
