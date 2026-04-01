import { Twitter, Github, Linkedin, Globe } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Product: ['Home', 'Explore Traders', 'Markets', 'Leaderboard'],
    Resources: ['Documentation', 'API Reference', 'Support', 'Status'],
    Company: ['About', 'Blog', 'Careers', 'Privacy Policy'],
    Social: ['Twitter', 'Discord', 'Telegram', 'Medium'],
  };

  return (
    <footer className="border-t border-border/50 bg-black">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <img src="/favicon.png" alt="MyCoinDeck Logo" className="h-9 w-9 rounded-full" />
              <span className="text-xl font-bold uppercase" style={{ fontFamily: "'Good Timing', sans-serif" }}>MyCoinDeck</span>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              Your complete crypto trading dashboard. Track, analyze, and improve your trading performance.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-secondary/50 text-muted-foreground transition-colors hover:border-[#AB51C5]/50 hover:text-[#AB51C5]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 font-medium">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <div className="text-sm text-muted-foreground">© 2026 MyCoinDeck. All rights reserved.</div>

          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
