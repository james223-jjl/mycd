import { TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const ease = [0, 0, 0.2, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 } as const,
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease },
  }),
};

function AnimatedBar({ height, color, delay }: { height: string; color: string; delay: number }) {
  return (
    <motion.div
      className="w-full rounded-t-lg"
      style={{ backgroundColor: color }}
      initial={{ height: 0 }}
      whileInView={{ height }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    />
  );
}

function StatCard({ label, value, valueClass, i }: { label: string; value: string; valueClass?: string; i: number }) {
  return (
    <motion.div
      className="rounded-xl border border-border/50 bg-secondary/50 p-4"
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-2 text-xl font-bold ${valueClass || ''}`}>{value}</div>
    </motion.div>
  );
}

export function PortfolioMockup() {
  const assets = [
    { name: 'BTC', value: 40, color: '#AB51C5' },
    { name: 'ETH', value: 30, color: '#a45fbd' },
    { name: 'SOL', value: 15, color: '#AB51C5' },
    { name: 'USDT', value: 10, color: '#a45fbd' },
    { name: 'Other', value: 5, color: '#AB51C5' },
  ];

  return (
    <div className="bg-black p-6">
      <div className="mb-6">
        <h3 className="mb-2 text-sm text-muted-foreground">Asset Allocation</h3>
        <div className="flex h-64 items-end gap-2">
          {assets.map((asset, i) => (
            <div key={asset.name} className="flex flex-1 flex-col items-center gap-2">
              <AnimatedBar height={`${asset.value * 2}%`} color={asset.color} delay={0.1 + i * 0.1} />
              <motion.div
                className="text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {asset.name}
              </motion.div>
              <motion.div
                className="text-xs font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {asset.value}%
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total Balance" value="$127,543.21" i={0} />
        <StatCard label="Daily PnL" value="+$3,247.89" valueClass="text-[#22c55e]" i={1} />
        <StatCard label="30-Day ROI" value="+18.7%" i={2} />
        <StatCard label="Win Rate" value="67.3%" i={3} />
      </div>
    </div>
  );
}

function AnimatedProgressBar({ percent, delay }: { percent: number; delay: number }) {
  return (
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
      <motion.div
        className="h-full bg-gradient-to-r from-[#AB51C5] to-[#a45fbd]"
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      />
    </div>
  );
}

export function TraderProfileMockup() {
  const exchanges = [
    { name: 'Binance', balance: '$45,230', pnl: '+$2,134', positive: true, type: 'Spot + Futures', logo: '/exchanges/binance.svg' },
    { name: 'Bybit', balance: '$32,890', pnl: '+$987', positive: true, type: 'Perpetuals', logo: '/exchanges/bybit.svg' },
    { name: 'OKX', balance: '$28,456', pnl: '-$342', positive: false, type: 'Unified', logo: '/exchanges/okx.svg' },
    { name: 'Bitget', balance: '$20,967', pnl: '+$468', positive: true, type: 'Spot + Futures', logo: '/exchanges/bitget.svg' },
  ];

  return (
    <div className="bg-black p-4 sm:p-6">
      {/* Connected status */}
      <motion.div
        className="mb-5 flex items-center justify-between"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-sm font-medium">Connected Exchanges</div>
        <motion.div
          className="inline-flex items-center gap-1.5 rounded-full bg-[#22c55e]/20 px-3 py-1 text-xs text-[#22c55e]"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
          All Synced
        </motion.div>
      </motion.div>

      {/* Exchange cards */}
      <div className="mb-5 space-y-3">
        {exchanges.map((ex, i) => (
          <motion.div
            key={ex.name}
            className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/50 p-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <motion.img
                src={ex.logo}
                alt={ex.name}
                className="h-8 w-8 shrink-0 object-contain"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 + i * 0.1 }}
              />
              <div>
                <div className="text-sm font-medium">{ex.name}</div>
                <div className="text-xs text-muted-foreground">{ex.type}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{ex.balance}</div>
              <div className={`text-xs ${ex.positive ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>{ex.pnl}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Combined totals */}
      <motion.div
        className="rounded-xl border border-[#AB51C5]/30 bg-[#AB51C5]/10 p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="mb-2 text-sm font-medium">Total Across All Exchanges</div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold">$127,543</span>
          <span className="text-sm font-medium text-[#22c55e]">+$3,247 today</span>
        </div>
      </motion.div>
    </div>
  );
}

export function AnalyticsMockup() {
  const feedItems = [
    { user: '@CryptoWhale', action: 'shared a position', content: 'Long BTC/USDT at $67,234 — targeting $72K. Risk/reward looks solid here.', likes: 342, comments: 28, time: '15m ago', avatar: '/avatars/33.png' },
    { user: '@DiamondHands', action: 'posted an analysis', content: 'ETH breaking above the 200 EMA on the 4H. Expecting continuation to $4K.', likes: 187, comments: 45, time: '1h ago', avatar: '/avatars/34.png' },
  ];

  const trending = [
    { tag: '#BTCBreakout', posts: '1.2K posts' },
    { tag: '#ETHMerge', posts: '890 posts' },
    { tag: '#SolanaRally', posts: '654 posts' },
  ];

  return (
    <div className="bg-black p-4 sm:p-6">
      {/* Feed header */}
      <motion.div
        className="mb-4 flex items-center justify-between"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-sm font-medium">Social Feed</div>
        <div className="text-xs text-[#AB51C5]">Trending</div>
      </motion.div>

      {/* Feed posts */}
      <div className="mb-4 space-y-3">
        {feedItems.map((item, i) => (
          <motion.div
            key={item.user}
            className="rounded-xl border border-border/50 bg-secondary/50 p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <motion.img
                src={item.avatar}
                alt={item.user}
                className="h-8 w-8 shrink-0 rounded-full object-cover"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 + i * 0.12 }}
              />
              <div>
                <span className="text-sm font-medium">{item.user}</span>
                <span className="ml-1 text-xs text-muted-foreground">{item.action}</span>
              </div>
              <span className="ml-auto text-xs text-muted-foreground">{item.time}</span>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">{item.content}</p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>{"❤️"} {item.likes}</span>
              <span>{"💬"} {item.comments}</span>
              <span>{"🔄"} Share</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trending tags */}
      <motion.div
        className="rounded-xl border border-border/50 bg-secondary/50 p-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mb-3 text-sm font-medium">Trending Topics</div>
        <div className="space-y-2">
          {trending.map((tag, i) => (
            <motion.div
              key={tag.tag}
              className="flex items-center justify-between text-sm"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <span className="font-medium text-[#AB51C5]">{tag.tag}</span>
              <span className="text-xs text-muted-foreground">{tag.posts}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function SocialFeedMockup() {
  const traders = [
    { name: '@CryptoWhale', followers: '12.4K', winRate: 78.5, pnl: '+$245K', rank: 1, avatar: '/avatars/35.png' },
    { name: '@DiamondHands', followers: '8.2K', winRate: 74.2, pnl: '+$198K', rank: 2, avatar: '/avatars/36.png' },
    { name: '@MoonTrader', followers: '5.7K', winRate: 71.8, pnl: '+$187K', rank: 3, avatar: '/avatars/37.png' },
  ];

  const allocations = [
    { coin: 'BTC', percent: 52 },
    { coin: 'ETH', percent: 28 },
    { coin: 'SOL', percent: 20 },
  ];

  return (
    <div className="bg-black p-4 sm:p-6">
      {/* Header */}
      <motion.div
        className="mb-4 flex items-center justify-between"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-sm font-medium">Top Traders</div>
        <div className="text-xs text-muted-foreground">This Week</div>
      </motion.div>

      {/* Trader cards */}
      <div className="mb-4 space-y-3">
        {traders.map((trader, i) => (
          <motion.div
            key={trader.name}
            className="rounded-xl border border-border/50 bg-secondary/50 p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <div className="mb-3 flex items-center gap-3">
              <motion.img
                src={trader.avatar}
                alt={trader.name}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 + i * 0.12 }}
              />
              <div className="flex-1">
                <div className="text-sm font-medium">{trader.name}</div>
                <div className="text-xs text-muted-foreground">{trader.followers} followers</div>
              </div>
              <motion.button
                className="rounded-full border border-[#AB51C5]/50 px-3 py-1 text-xs text-[#AB51C5] transition-colors hover:bg-[#AB51C5]/10"
                whileHover={{ scale: 1.05 }}
              >
                Follow
              </motion.button>
            </div>
            <div className="flex gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Win Rate </span>
                <span className="font-medium">{trader.winRate}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">PnL </span>
                <span className="font-medium text-[#22c55e]">{trader.pnl}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Allocation preview */}
      <motion.div
        className="rounded-xl border border-border/50 bg-secondary/50 p-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <div className="mb-3 text-sm font-medium">@CryptoWhale's Allocation</div>
        <div className="space-y-2">
          {allocations.map((item, i) => (
            <div key={item.coin} className="flex items-center gap-3">
              <div className="w-10 text-xs font-medium">{item.coin}</div>
              <AnimatedProgressBar percent={item.percent} delay={0.4 + i * 0.12} />
              <div className="w-10 text-right text-xs text-muted-foreground">{item.percent}%</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function PositionsMockup() {
  const news = [
    { title: 'Bitcoin ETF sees $1.2B record daily inflows', source: 'Bloomberg', time: '12m ago', bullish: true },
    { title: 'Ethereum Layer 2 TVL hits new all-time high', source: 'The Block', time: '34m ago', bullish: true },
    { title: 'SEC delays decision on Solana ETF application', source: 'CoinDesk', time: '1h ago', bullish: false },
  ];

  const gainers = [
    { coin: 'BTC', price: '$68,234', change: '+5.4%', positive: true, logo: '/coins/btc.png' },
    { coin: 'ETH', price: '$3,523', change: '+3.2%', positive: true, logo: '/coins/eth.png' },
    { coin: 'SOL', price: '$142', change: '-1.8%', positive: false, logo: '/coins/sol.png' },
  ];

  return (
    <div className="bg-black p-4 sm:p-6">
      {/* Market pulse header */}
      <motion.div
        className="mb-4 grid grid-cols-2 gap-3"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-xl border border-border/50 bg-secondary/50 p-3">
          <div className="text-[10px] uppercase text-muted-foreground">Fear & Greed</div>
          <div className="mt-1 text-xl font-bold">72</div>
          <div className="text-xs text-[#22c55e]">Greed</div>
        </div>
        <div className="rounded-xl border border-border/50 bg-secondary/50 p-3">
          <div className="text-[10px] uppercase text-muted-foreground">Market Pulse</div>
          <div className="mt-1 text-xl font-bold">Bullish</div>
          <div className="flex items-center text-xs text-[#22c55e]">
            <TrendingUp className="mr-0.5 h-3 w-3" />
            Strong
          </div>
        </div>
      </motion.div>

      {/* Latest news */}
      <motion.div
        className="mb-4 rounded-xl border border-border/50 bg-secondary/50 p-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-medium">Latest News</div>
          <motion.span
            className="flex items-center gap-1 text-xs text-[#22c55e]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            Live
          </motion.span>
        </div>
        <div className="space-y-3">
          {news.map((item, i) => (
            <motion.div
              key={item.title}
              className="border-b border-border/30 pb-3 last:border-0 last:pb-0"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="mb-1 text-sm">{item.title}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{item.source}</span>
                <span>·</span>
                <span>{item.time}</span>
                <span className={`ml-auto rounded px-1.5 py-0.5 text-[10px] ${item.bullish ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-[#ef4444]/20 text-[#ef4444]'}`}>
                  {item.bullish ? 'Bullish' : 'Bearish'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top movers */}
      <motion.div
        className="rounded-xl border border-border/50 bg-secondary/50 p-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mb-3 text-sm font-medium">Top Movers</div>
        <div className="space-y-2">
          {gainers.map((coin, i) => (
            <motion.div
              key={coin.coin}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <div className="flex items-center gap-2">
                <img src={coin.logo} alt={coin.coin} className="h-7 w-7 shrink-0 rounded-full object-cover" />
                <span className="text-sm font-medium">{coin.coin}</span>
              </div>
              <div className="text-right">
                <div className="text-sm">{coin.price}</div>
                <div className={`text-xs ${coin.positive ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>{coin.change}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function MarketMockup() {
  const coins = [
    { coin: 'Bitcoin', symbol: 'BTC', price: '68,234', change: 5.4, positive: true, logo: '/coins/btc.png' },
    { coin: 'Ethereum', symbol: 'ETH', price: '3,523', change: 3.2, positive: true, logo: '/coins/eth.png' },
    { coin: 'Solana', symbol: 'SOL', price: '142', change: -1.8, positive: false, logo: '/coins/sol.png' },
  ];

  return (
    <div className="bg-black p-6">
      <div className="mb-6 grid grid-cols-2 gap-4">
        <motion.div
          className="rounded-xl border border-border/50 bg-secondary/50 p-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-muted-foreground">Fear & Greed Index</div>
          <div className="mt-2 text-3xl font-bold">72</div>
          <div className="text-sm text-[#22c55e]">Greed</div>
        </motion.div>
        <motion.div
          className="rounded-xl border border-border/50 bg-secondary/50 p-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-xs text-muted-foreground">Market Sentiment</div>
          <div className="mt-2 text-3xl font-bold">Bullish</div>
          <div className="flex items-center text-sm text-[#22c55e]">
            <TrendingUp className="mr-1 h-4 w-4" />
            Strong
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mb-6 rounded-xl border border-border/50 bg-secondary/50 p-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h3 className="mb-4 text-sm font-medium">Trending Coins</h3>
        <div className="space-y-3">
          {coins.map((coin, i) => (
            <motion.div
              key={coin.symbol}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <motion.img
                  src={coin.logo}
                  alt={coin.symbol}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 + i * 0.1 }}
                />
                <div>
                  <div className="text-sm font-medium">{coin.coin}</div>
                  <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">${coin.price}</div>
                <div className={`text-xs ${coin.positive ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {coin.positive ? '+' : ''}{coin.change}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="rounded-xl border border-border/50 bg-secondary/50 p-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="mb-3 text-sm font-medium">Latest Crypto News</h3>
        <div className="space-y-2">
          {['Bitcoin ETF sees record inflows', 'Ethereum upgrade scheduled for Q2', 'Major DeFi protocol announces...'].map(
            (news, i) => (
              <motion.div
                key={i}
                className="border-b border-border/30 pb-2 text-sm last:border-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {news}
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}
