'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Modal, Input, message } from 'antd';
import { ArrowLeftOutlined, AppstoreOutlined, HistoryOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { createClient } from '@/lib/supabase';
import { BaytnaShell, SectionLabel } from './components/BaytnaShell';

type List = { id:string; name:string; status:string; updated_at:string };

export default function HomePage() {
  const [lists,setLists]=useState<List[]>([]),[open,setOpen]=useState(false),[name,setName]=useState(''),[loading,setLoading]=useState(true),[user,setUser]=useState<any>();
  const load=async()=>{const s=createClient();const [{data:l},{data:u}]=await Promise.all([s.from('shopping_lists').select('id,name,status,updated_at').order('updated_at',{ascending:false}).limit(5),s.auth.getUser()]);setLists(l??[]);setUser(u.user);setLoading(false)};
  useEffect(()=>{load()},[]);
  async function createList(){if(!name.trim())return;const s=createClient();const {data:{user:u}}=await s.auth.getUser();if(!u)return;const {error}=await s.from('shopping_lists').insert({user_id:u.id,name:name.trim()});if(error)message.error(error.message);else{message.success('تم إنشاء القائمة');setName('');setOpen(false);load()}}
  return <BaytnaShell><div className="baytna-container">
    <section className="dashboard-hero">
      <div className="hero-copy"><SectionLabel>YOUR HOME / بيتنا</SectionLabel><h1>كل مشتريات البيت.<br/><strong>في مكان واحد.</strong></h1><p>{user?.email ? `أهلاً بيك — ${user.email}` : 'نظّم احتياجاتك، تابع مشترياتك، واعرف أسعارك من غير وجع دماغ.'}</p><div className="hero-actions"><Button type="primary" size="large" icon={<PlusOutlined/>} onClick={()=>setOpen(true)}>ابدأ قائمة جديدة</Button><Link href="/products"><Button size="large" icon={<AppstoreOutlined/>}>تصفح المنتجات</Button></Link></div></div>
      <div className="hero-visual" aria-hidden="true"><div className="hero-orbit"/><div className="floating-card one">🛒 قائمة الأسبوع <span>✓</span></div><div className="floating-card two">📈 السعر بيتابع معاك</div></div>
    </section>

    <section className="section"><SectionLabel>AT A GLANCE</SectionLabel><div className="stat-grid"><div className="stat-card"><div className="stat-label">قوائمك الأخيرة</div><div className="stat-value">{loading?'—':lists.length}</div></div><div className="stat-card"><div className="stat-label">تاريخ الأسعار</div><div className="stat-value">جاهز</div></div><div className="stat-card"><div className="stat-label">الفواتير</div><div className="stat-value">محفوظة</div></div></div></section>

    <section className="section"><div className="section-title"><div><SectionLabel>QUICK ACTIONS</SectionLabel><h2>ابدأ من هنا</h2></div></div><div className="quick-grid"><Link href="/lists" className="quick-card"><span className="quick-icon"><ShoppingCartOutlined/></span><b>قوائم المشتريات</b><span className="product-meta">ضيف وراجع كل اللي محتاجه</span></Link><Link href="/products" className="quick-card"><span className="quick-icon"><AppstoreOutlined/></span><b>المنتجات</b><span className="product-meta">اكتشف الكتالوج وابحث بسرعة</span></Link><Link href="/history" className="quick-card"><span className="quick-icon"><HistoryOutlined/></span><b>تاريخ الأسعار</b><span className="product-meta">شوف آخر سعر دفعته</span></Link><Link href="/receipts" className="quick-card"><span className="quick-icon">🧾</span><b>الفواتير</b><span className="product-meta">احفظ الريسيت في حسابك</span></Link></div></section>

    <section className="section"><div className="section-title"><div><SectionLabel>RECENT LISTS</SectionLabel><h2>قوائمك</h2></div><Button type="primary" icon={<PlusOutlined/>} onClick={()=>setOpen(true)}>قائمة جديدة</Button></div><div className="list-card">{!loading&&!lists.length?<div className="empty-state">لسه مفيش قوائم. اعمل أول قائمة ليك.</div>:lists.map(l=><Link href="/lists" className="list-row" key={l.id}><div><div className="product-name">{l.name}</div><div className="product-meta">{new Date(l.updated_at).toLocaleDateString('ar-EG')}</div></div><span className="status-pill">{l.status==='shopping'?'تسوق':l.status==='completed'?'مكتملة':'مسودة'}</span><ArrowLeftOutlined/></Link>)}</div></section>
  </div><Modal title="قائمة مشتريات جديدة" open={open} onCancel={()=>setOpen(false)} onOk={createList} okText="إنشاء" cancelText="إلغاء"><Input autoFocus placeholder="مثلاً: مشتريات الأسبوع" value={name} onChange={e=>setName(e.target.value)} onPressEnter={createList}/></Modal></BaytnaShell>
}
