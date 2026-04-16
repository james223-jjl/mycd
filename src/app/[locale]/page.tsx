import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'MyCoinDeck — Unified Crypto Trading Dashboard',
  description:
    'MyCoinDeck unifies all your crypto trading data into one powerful dashboard. Track PnL, analytics, leaderboards, and social trading across Binance, Bybit, OKX, and Bitget.',
};

export default function HomePage() {
  return <HomeClient />;
}
