import { TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export function Leaderboard() {
  const traders = [
    { rank: 1, name: 'CryptoWhale', pnl: 245678, winRate: 78.5, volume: 12.5, avatar: '/avatars/38.png' },
    { rank: 2, name: 'DiamondHands', pnl: 198432, winRate: 74.2, volume: 9.8, avatar: '/avatars/39.png' },
    { rank: 3, name: 'MoonTrader', pnl: 187654, winRate: 71.8, volume: 8.4, avatar: '/avatars/40.png' },
    { rank: 4, name: 'BullMarket', pnl: 145789, winRate: 69.3, volume: 7.2, avatar: '/avatars/41.png' },
    { rank: 5, name: 'TraderPro', pnl: 134567, winRate: 68.7, volume: 6.8, avatar: '/avatars/42.png' },
    { rank: 6, name: 'CoinMaster', pnl: 125890, winRate: 67.4, volume: 6.1, avatar: '/avatars/43.png' },
    { rank: 7, name: 'CryptoKing', pnl: 118765, winRate: 66.8, volume: 5.9, avatar: '/avatars/44.png' },
    { rank: 8, name: 'SatoshiFan', pnl: 109876, winRate: 65.2, volume: 5.5, avatar: '/avatars/45.png' },
  ];

  const rankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-black';
    if (rank === 2) return 'bg-gradient-to-br from-gray-400 to-gray-500 text-black';
    if (rank === 3) return 'bg-gradient-to-br from-orange-600 to-orange-700 text-white';
    return '';
  };

  return (
    <section id="leaderboard" className="border-b border-border/50 py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2
            className="mb-4 bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            Top Traders Leaderboard
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Follow and learn from the best performers
          </motion.p>
        </div>

        <motion.div
          className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-secondary/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Desktop Table Header */}
          <motion.div
            className="hidden grid-cols-[60px_1fr_120px_120px_120px] gap-4 border-b border-border/50 bg-secondary/50 px-6 py-4 text-sm text-muted-foreground md:grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <div>Rank</div>
            <div>Trader</div>
            <div className="text-right">PnL</div>
            <div className="text-right">Win Rate</div>
            <div className="text-right">Volume (M)</div>
          </motion.div>

          {/* Table Body */}
          <div className="divide-y divide-border/30">
            {traders.map((trader, i) => {
              const isTopThree = trader.rank <= 3;

              return (
                <motion.div
                  key={trader.rank}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.07 }}
                  whileHover={{ backgroundColor: 'rgba(171, 81, 197, 0.08)' }}
                  className={`px-4 py-4 transition-colors sm:px-6 ${
                    isTopThree ? 'bg-gradient-to-r from-[#AB51C5]/10 to-transparent' : ''
                  }`}
                >
                  {/* Desktop row */}
                  <div className="hidden grid-cols-[60px_1fr_120px_120px_120px] gap-4 md:grid">
                    <div className="flex items-center">
                      {isTopThree ? (
                        <motion.div
                          className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${rankBadge(trader.rank)}`}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 0.3 + i * 0.07 }}
                        >
                          {trader.rank}
                        </motion.div>
                      ) : (
                        <div className="text-muted-foreground">{trader.rank}</div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <motion.img
                        src={trader.avatar} alt={trader.name}
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.25 + i * 0.07 }}
                      />
                      <div>
                        <div className="font-medium">@{trader.name}</div>
                        {isTopThree && (
                          <motion.div
                            className="flex items-center text-xs text-[#AB51C5]"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.07 }}
                          >
                            <TrendingUp className="mr-1 h-3 w-3" />
                            Top Performer
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <motion.div
                      className="flex items-center justify-end font-medium text-[#22c55e]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + i * 0.07 }}
                    >
                      +${trader.pnl.toLocaleString()}
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-end font-medium"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.07 }}
                    >
                      {trader.winRate}%
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-end text-muted-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.45 + i * 0.07 }}
                    >
                      ${trader.volume}M
                    </motion.div>
                  </div>

                  {/* Mobile card layout */}
                  <div className="flex flex-col gap-2.5 md:hidden">
                    {/* Top row: rank + avatar + name */}
                    <div className="flex items-center gap-2.5">
                      {isTopThree ? (
                        <motion.div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${rankBadge(trader.rank)}`}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 0.3 + i * 0.07 }}
                        >
                          {trader.rank}
                        </motion.div>
                      ) : (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center text-sm text-muted-foreground">{trader.rank}</div>
                      )}
                      <motion.img
                        src={trader.avatar} alt={trader.name}
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.25 + i * 0.07 }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">@{trader.name}</div>
                        {isTopThree && (
                          <div className="flex items-center text-[10px] text-[#AB51C5]">
                            <TrendingUp className="mr-0.5 h-2.5 w-2.5" />
                            Top Performer
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Stats row */}
                    <div className="ml-[66px] flex items-center gap-3 rounded-lg bg-secondary/40 px-3 py-2 text-xs">
                      <div className="flex-1">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">PnL</div>
                        <div className="font-semibold text-[#22c55e]">+${trader.pnl.toLocaleString()}</div>
                      </div>
                      <div className="h-6 w-px bg-border/50" />
                      <div className="flex-1 text-center">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Win Rate</div>
                        <div className="font-semibold">{trader.winRate}%</div>
                      </div>
                      <div className="h-6 w-px bg-border/50" />
                      <div className="flex-1 text-right">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Volume</div>
                        <div className="font-semibold">${trader.volume}M</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <button className="text-[#AB51C5] transition-colors hover:text-[#c76de0] hover:underline">
            View Full Leaderboard →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
