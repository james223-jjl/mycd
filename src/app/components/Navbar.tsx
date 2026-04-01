import { useState, useEffect, useRef } from 'react';
import { Menu, X, Compass, LineChart, Trophy, LogIn, ArrowRight } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from './ui/button';

const navLinks = [
  { href: '#explore', label: 'Explore Traders', icon: Compass },
  { href: '#markets', label: 'Markets', icon: LineChart },
  { href: '#leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '#login', label: 'Login', icon: LogIn },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 80 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        hidden ? '-top-20' : 'top-0'
      } ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex min-w-0 items-center gap-2">
            <img src="/favicon.png" alt="MyCoinDeck Logo" className="h-8 w-8 shrink-0 rounded-full sm:h-9 sm:w-9" />
            <span className="truncate text-lg font-bold uppercase tracking-tight sm:text-xl" style={{ fontFamily: "'Good Timing', sans-serif" }}>MyCoinDeck</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#get-started"
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-white" />
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content
                className="fixed left-1 right-1 bottom-1 z-50 rounded-xl bg-[rgba(25,24,27,0.90)] p-2 text-[rgba(255,255,255,0.64)] text-sm backdrop-blur-[12px] overflow-y-auto max-h-[90vh] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4 duration-200"
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Navigation menu
                </Dialog.Description>

                {/* Header row */}
                <div className="flex items-center justify-between mb-1 px-1">
                  <div className="flex items-center justify-center size-10">
                    <img src="/favicon.png" alt="MyCoinDeck Logo" className="h-7 w-7 rounded-full" />
                  </div>

                  {/* Decorative dots */}
                  <svg width="30" height="6" viewBox="0 0 30 6" fill="none" className="pointer-events-none">
                    <circle cx="3" cy="3" r="3" fill="#AB51C5" fillOpacity="0.15" />
                    <circle cx="15" cy="3" r="3" fill="#AB51C5" fillOpacity="0.15" />
                    <circle cx="27" cy="3" r="3" fill="#AB51C5" fillOpacity="0.15" />
                  </svg>

                  <Dialog.Close asChild>
                    <button
                      className="p-2 text-[#848895] hover:text-white transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Nav links */}
                <nav className="px-3 divide-y divide-[rgba(238,228,255,0.06)]">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Dialog.Close asChild key={link.href}>
                        <a
                          href={link.href}
                          className="w-full flex items-center gap-3 py-4 text-[16px] font-medium hover:bg-gradient-to-r hover:from-transparent hover:via-white/5 hover:to-transparent transition-colors"
                        >
                          <Icon className="size-5 shrink-0 text-white" />
                          <span className="font-medium text-white grow">{link.label}</span>
                        </a>
                      </Dialog.Close>
                    );
                  })}
                </nav>

                {/* Get Started button */}
                <div className="px-3 pt-2 pb-2">
                  <Dialog.Close asChild>
                    <a href="#get-started" className="block">
                      <Button className="w-full bg-[#AB51C5] hover:bg-[#a45fbd] shadow-lg shadow-[#AB51C5]/30">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </nav>
  );
}
