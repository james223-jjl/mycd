import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Michael Chen',
      role: 'Professional Trader',
      image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NTk5MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      initials: 'MC',
      content:
        'MyCoinDeck has completely transformed how I track my crypto portfolio. The analytics are incredibly detailed and the interface is beautiful.',
    },
    {
      name: 'Sarah Thompson',
      role: 'Crypto Investor',
      image: 'https://images.unsplash.com/photo-1765648636065-fd5c0884b629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGJ1c2luZXNzd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzQ1OTkxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      initials: 'ST',
      content:
        'Following top traders and analyzing their strategies has helped me improve my win rate by 25%. This platform is a game-changer.',
    },
    {
      name: 'David Martinez',
      role: 'Day Trader',
      image: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0cmFkZXIlMjBwb3J0cmFpdCUyMGJ1c2luZXNzbWFufGVufDF8fHx8MTc3NDU5OTE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      initials: 'DM',
      content:
        'The real-time position monitoring and advanced analytics have given me the edge I need. Best trading dashboard I\'ve ever used.',
    },
  ];

  return (
    <section className="border-b border-border/50 py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2
            className="mb-4 bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            Trusted by Traders Worldwide
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            See what our community has to say
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-secondary to-secondary/50 p-6 transition-all hover:border-[#AB51C5]/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#AB51C5]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-4 flex items-center gap-4">
                  <div className="relative h-12 w-12 shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#AB51C5] to-[#a45fbd] text-sm font-bold text-white">
                      {testimonial.initials}
                    </div>
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                  >
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </motion.div>
                </div>

                <motion.p
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  {testimonial.content}
                </motion.p>

                <div className="mt-4 flex text-[#AB51C5]">
                  {[...Array(5)].map((_, j) => (
                    <motion.svg
                      key={j}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.45 + i * 0.15 + j * 0.05 }}
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </motion.svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
