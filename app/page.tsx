'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Empty, Input, Modal, Tag, message } from 'antd';
import { PlusOutlined, ShoppingCartOutlined, HeartOutlined, HistoryOutlined, ShopOutlined } from '@ant-design/icons';
import { createClient } from '@/lib/supabase';

type List = { id: string; name: string; status: string; updated_at: string };

export default function HomePage() {
  const [lists, setLists] = useState<List[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('shopping_lists').select('id,name,status,updated_at').order('updated_at', { ascending: false }).limit(5);
    setLists(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function createList() {
    if (!name.trim()) return;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { message.info('سجّل الدخول أولاً'); return; }
    const { error } = await supabase.from('shopping_lists').insert({ user_id: user.id, name: name.trim() });
    if (error) message.error(error.message); else { message.success('تم إنشاء القائمة'); setName(''); setOpen(false); load(); }
  }

  return <main className="baytna-page">
    <header className="baytna-header"><div className="baytna-container header-inner"><div className="brand"><span className="brand-mark">🏠</span><span>بيتنا</span></div><Button type="text">العربية / English</Button></div></header>
    <div className="baytna-container">
      <section className="hero"><h1>أهلاً بيك في بيتنا 👋</h1><p>اعرف ناقص إيه، اعمل ليستة، وانزل اشتري وأنت عارف.</p></section>
      <section className="section"><div className="stat-grid"><div className="stat-card"><div className="stat-label">قائمة التسوق الحالية</div><div className="stat-value">{lists.length}</div></div><div className="stat-card"><div className="stat-label">مشتريات الشهر</div><div className="stat-value">— <span style={{fontSize:14}}>EGP</span></div></div><div className="stat-card"><div className="stat-label">آخر سعر مسجل</div><div className="stat-value">—</div></div></div></section>
      <section className="section"><div className="section-title"><h2>ابدأ بسرعة</h2></div><div className="quick-grid"><div className="quick-card" onClick={() => setOpen(true)}><div className="quick-icon">🛒</div><b>قائمة جديدة</b><div className="product-meta">ضيف كل اللي محتاجه</div></div><div className="quick-card"><div className="quick-icon">📦</div><b>المنتجات</b><div className="product-meta">ابحث في الكتالوج</div></div><div className="quick-card"><div className="quick-icon">❤️</div><b>المفضلة</b><div className="product-meta">حاجاتك المتكررة</div></div><div className="quick-card"><div className="quick-icon">🏪</div><b>المحلات</b><div className="product-meta">أماكن الشراء</div></div></div></section>
      <section className="section"><div className="section-title"><h2>قوائمك</h2><Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>قائمة جديدة</Button></div><Card loading={loading} className="list-card">{!loading && !lists.length ? <Empty description="لسه مفيش قوائم. اعمل أول قائمة ليك." /> : lists.map(list => <div className="list-row" key={list.id}><div><div className="product-name">{list.name}</div><div className="product-meta">{new Date(list.updated_at).toLocaleDateString('ar-EG')}</div></div><Tag color={list.status === 'shopping' ? 'orange' : 'green'}>{list.status === 'shopping' ? 'بتشتري دلوقتي' : 'مسودة'}</Tag></div>)}</Card></section>
      <section className="section"><div className="section-title"><h2>المراحل</h2></div><div className="list-card"><div className="list-row"><span>1. List → Buy → Record Price</span><Tag color="green">Simple</Tag></div><div className="list-row"><span>2. Favorites → History → Buy Again → Stores</span><Tag color="blue">Personal</Tag></div><div className="list-row"><span>3. Price Comparison → Budget → Suggestions</span><Tag color="gold">Smart</Tag></div><div className="list-row"><span>4. Recipes → Missing Items → AI Shopping</span><Tag color="purple">AI</Tag></div></div></section>
    </div>
    <Modal title="قائمة مشتريات جديدة" open={open} onCancel={() => setOpen(false)} onOk={createList} okText="إنشاء" cancelText="إلغاء"><Input autoFocus placeholder="مثلاً: مشتريات الأسبوع" value={name} onChange={e => setName(e.target.value)} onPressEnter={createList} /></Modal>
  </main>;
}
