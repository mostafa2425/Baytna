'use client';
import { useEffect, useMemo, useState } from 'react';
import { Empty, Input, Spin, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { BaytnaShell, SectionLabel } from '../components/BaytnaShell';
import { createClient } from '@/lib/supabase';

export default function ProductsPage(){
 const [q,setQ]=useState(''),[items,setItems]=useState<any[]>([]),[loading,setLoading]=useState(true);
 useEffect(()=>{(async()=>{const {data}=await createClient().from('product_variants').select('id,amount,unit,variant_name_ar,variant_name_en,base_products(name_ar,name_en,categories(name_ar,name_en))').limit(500);setItems(data??[]);setLoading(false)})()},[]);
 const filtered=useMemo(()=>items.filter(x=>`${x.variant_name_ar??''} ${x.variant_name_en??''} ${x.base_products?.name_ar??''}`.toLowerCase().includes(q.toLowerCase())),[items,q]);
 return <BaytnaShell><div className="baytna-container"><section className="hero"><SectionLabel>PRODUCT CATALOG</SectionLabel><h1>اختار اللي <span className="accent">ناقصك.</span></h1><p>كتالوج بيتنا مصمم يخليك تلاقي المنتج والحجم المناسب في ثواني.</p></section><section className="section"><div className="catalog-toolbar"><Input size="large" prefix={<SearchOutlined/>} placeholder="ابحث عن لبن، طماطم، أرز..." value={q} onChange={e=>setQ(e.target.value)}/></div>{loading?<div className="loading-state"><Spin/></div>:!filtered.length?<div className="content-card"><Empty description="مفيش منتجات مطابقة"/></div>:<div className="product-grid">{filtered.map(x=><article className="product-card" key={x.id}><Tag className="product-badge">{x.base_products?.categories?.name_ar||'منتج'}</Tag><div><h3>{x.variant_name_ar||x.base_products?.name_ar}</h3><div className="english">{x.variant_name_en||x.base_products?.name_en}</div></div><div className="variant-footer"><strong>{x.amount} {x.unit}</strong><span className="status-pill">متاح</span></div></article>)}</div>}</section></div></BaytnaShell>
}
