'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'antd';
import { AppstoreOutlined, HistoryOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { createClient } from '@/lib/supabase';

const nav = [
  { href: '/', label: 'الرئيسية', icon: AppstoreOutlined },
  { href: '/products', label: 'المنتجات', icon: AppstoreOutlined },
  { href: '/lists', label: 'القوائم', icon: ShoppingCartOutlined },
  { href: '/history', label: 'الأسعار', icon: HistoryOutlined },
  { href: '/stores', label: 'المحلات', icon: ShopOutlined },
];

export function BaytnaShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await createClient().auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <main className="baytna-page">
      <header className="baytna-header">
        <div className="baytna-container header-inner">
          <Link href="/" className="brand" aria-label="بيتنا - الرئيسية">
            <span className="brand-mark">ب</span>
            <span>بيتنا</span>
          </Link>
          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={`nav-link ${pathname === href ? 'active' : ''}`}>
                <Icon /> {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link href="/receipts" className="receipt-link">الفواتير</Link>
            <Button type="text" icon={<LogoutOutlined />} onClick={logout} aria-label="تسجيل الخروج" />
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label"><span className="pulse-dot" />{children}</div>;
}
