import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { FeatureSection } from './components/FeatureSection';
import {
  PortfolioMockup,
  TraderProfileMockup,
  AnalyticsMockup,
  SocialFeedMockup,
  PositionsMockup,
  MarketMockup,
} from './components/FeatureMockups';
import { HowItWorks } from './components/HowItWorks';
import { Leaderboard } from './components/Leaderboard';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Trust Bar - hidden for now */}
        {/* <TrustBar /> */}

        {/* Core Features Header */}
        <section className="pt-24 pb-8">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mb-4 mx-auto max-w-4xl bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl">
              MyCoinDeck unifies all your trading data into one powerful dashboard.
            </h2>
            <p className="text-sm font-medium uppercase tracking-widest text-[#AB51C5]">Core Features</p>
          </div>
        </section>

        {/* Feature 1: Performance Analytics */}
        <FeatureSection
          title="Performance Analytics"
          description="Track PnL, win rate, ROI — with a deep breakdown of every trade to identify your strengths and weaknesses."
          highlights={['Track PnL, win rate, ROI', 'Deep breakdown of trades', 'Identify strengths & weaknesses']}
          visual={<PortfolioMockup />}
        />

        {/* Feature 2: Unified Exchange View */}
        <FeatureSection
          title="Unified Exchange View"
          description="Connect your exchange API keys and automatically sync trades, positions, and PnL in real time across Binance, Bybit, OKX, and Bitget."
          highlights={['Total Balance & Daily PnL', '30-Day ROI & Win Rate', 'Initial Asset vs Current Asset', 'Cross-exchange unified view']}
          visual={<TraderProfileMockup />}
          reversed
        />

        {/* Feature 3: Get Connected */}
        <FeatureSection
          title="Get Connected"
          description="Post your trades and market insights. Like, reshare, and comment on other traders' posts. Build your following in the crypto trading community."
          highlights={['Social feed — like Twitter for traders', 'Share positions & analysis', 'Follow feed from traders you trust', 'Trending posts & popular traders']}
          visual={<AnalyticsMockup />}
        />

        {/* Feature 4: Discover Top Traders */}
        <FeatureSection
          title="Discover and Follow Top Traders"
          description="Browse profiles of real traders, view their full trading history, positions, PnL analysis, and coin allocations. Follow traders you admire and learn from their strategies."
          highlights={['Win Rate, Total PnL, Trading Volume', 'Open Positions & Order History', 'Coin & Wallet Allocation Charts', 'Follow / Unfollow traders']}
          visual={<SocialFeedMockup />}
          reversed
        />

        {/* Feature 5: Instant Worldwide News */}
        <FeatureSection
          title="Instant Worldwide News"
          description="Never miss a market-moving event."
          highlights={['Curated market updates', 'Stay ahead of trends']}
          visual={<PositionsMockup />}
        />

        {/* Feature 6: Market Intelligence */}
        <FeatureSection
          title="Market Intelligence"
          description="Stay ahead of the market."
          highlights={['Fear and Greed Index', 'Trending Coins', 'Crypto News', 'Market Sentiment']}
          visual={<MarketMockup />}
          reversed
        />

        {/* How It Works */}
        <HowItWorks />

        {/* Leaderboard */}
        <Leaderboard />

        {/* Testimonials */}
        <Testimonials />

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
