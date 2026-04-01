import { Shuffle, EyeOff, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

const problems = [
  {
    icon: Shuffle,
    headline: 'Scattered Trades',
    description: 'Your trades are scattered across exchanges',
  },
  {
    icon: EyeOff,
    headline: 'Blind Performance',
    description: "You don't know your real performance",
  },
  {
    icon: HelpCircle,
    headline: 'Guessing Game',
    description: "You're guessing, not improving",
  },
];

export function TrustBar() {
  return (
    <section className="border-b border-border/50 py-16">
      <div className="container mx-auto px-6">
        <motion.p
          className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-[#AB51C5]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          The Problem
        </motion.p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {problems.map((item, i) => (
            <motion.div
              key={item.headline}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-secondary to-secondary/50 p-8 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#AB51C5]/5 to-transparent" />
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: i * 0.15 + 0.2 }}
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#AB51C5]/20"
                >
                  <item.icon className="h-6 w-6 text-[#AB51C5]" />
                </motion.div>
                <motion.div
                  className="mb-2 text-xl font-bold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                >
                  {item.headline}
                </motion.div>
                <motion.p
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.4 }}
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
