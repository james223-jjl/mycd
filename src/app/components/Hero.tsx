import { ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { MeteorEffect } from './MeteorEffect';


export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/50 pt-16 pb-20 sm:pt-32">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-[center_60%] sm:bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          mask: 'linear-gradient(to bottom, transparent 0%, black 15%, black 45%, transparent 75%)',
          WebkitMask: 'linear-gradient(to bottom, transparent 0%, black 15%, black 45%, transparent 75%)',
          opacity: 0.35,
        }}
      />
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#AB51C5]/10 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[150px]" style={{ background: 'radial-gradient(circle, rgba(171, 81, 197, 0.3) 0%, rgba(151, 100, 255, 0.15) 40%, rgba(100, 60, 180, 0.06) 70%, transparent 100%)' }} />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center pt-10 sm:pt-16">
          {/* Headline */}
          <motion.div
            className="mb-6 inline-flex h-9 items-center gap-2 rounded-full bg-gradient-to-b from-black to-[#1A0026] px-4 py-2 shadow-[0_-4px_12px_0_#361B40_inset,0_1px_0_0_#AB51C5_inset,0_-1px_0_0_#C06BDB_inset] backdrop-blur-[3px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TrendingUp className="h-4 w-4 text-[#AB51C5]" />
            <span className="text-sm text-white">Track, Analyze, and Improve</span>
          </motion.div>

          <div className="relative overflow-visible py-6">
            {/* xAI-style stars behind title */}
            <MeteorEffect
              className="-top-16 sm:-top-32"
              meteorCount={4}
              style={{ mask: 'radial-gradient(ellipse at center, black 15%, transparent 65%)' }}
            />
            {/* Color gradient overlay — purple theme */}
            <div
              className="absolute inset-x-0 -top-16 h-[300px] sm:-top-32"
              style={{
                background: 'linear-gradient(to right, rgba(171, 81, 197, 0.1), rgba(171, 81, 197, 0.1), rgba(189, 160, 230, 0.1), rgba(151, 160, 255, 0.1), rgba(151, 160, 255, 0.1))',
                mask: 'radial-gradient(ellipse at top, black, transparent 0%)',
              }}
            />

            <h1 className="relative mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              <motion.span
                className="inline-block bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Your Entire Trading
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-white via-[#AB51C5] to-[#9760FF] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Performance Unified.
              </motion.span>
            </h1>
          </div>

          <motion.p
            className="mb-10 text-xl text-muted-foreground md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Track your portfolio, analyze your trading performance, and follow successful traders — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Button size="lg" className="bg-[#AB51C5] hover:bg-[#a45fbd] shadow-lg shadow-[#AB51C5]/50">
              Connect API now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {/* <Button size="lg" variant="outline" className="border-border bg-secondary hover:bg-accent">
              Explore Top Traders
            </Button> */}
          </motion.div>

          {/* Video Player - hidden for now */}
          {/* <div className="relative mx-auto max-w-6xl">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[#AB51C5]/40 via-[#AB51C5]/20 to-transparent blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-secondary/80 shadow-2xl backdrop-blur-sm">
              <VideoPlayer />
            </div>
          </div> */}

          {/* Exchange Logos - hidden for now */}
          {/* <div className="mt-20">
            <p className="mb-6 text-sm text-muted-foreground">SUPPORTED EXCHANGES</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
              <div className="text-2xl font-bold">Binance</div>
              <div className="text-2xl font-bold">Bybit</div>
              <div className="text-2xl font-bold">OKX</div>
              <div className="text-2xl font-bold">Bitget</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

// VideoPlayer hidden for now