import 'antd/dist/reset.css';
import './globals.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Baytna | بيتنا', description: 'مشتريات بيتك، كلها في مكان واحد.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
