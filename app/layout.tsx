import 'antd/dist/reset.css';
import './globals.scss';
import type { Metadata } from 'next';
import { Inter, Calistoga, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const calistoga = Calistoga({ weight: '400', subsets: ['latin'], variable: '--font-calistoga' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Baytna | بيتنا',
  description: 'مشتريات بيتك، كلها في مكان واحد.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body className={`${inter.variable} ${calistoga.variable} ${mono.variable}`}>{children}</body></html>;
}
