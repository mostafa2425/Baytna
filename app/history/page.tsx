'use client';
import { useEffect, useState } from 'react';
import { Empty, Tag, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { BaytnaShell, SectionLabel } from '../components/BaytnaShell';
import { createClient } from '@/lib/supabase';

export default function HistoryPage(){
 const [rows,setRows]=useState<any[]>([]),[loading,setLoading]=useState(true);
 useEffect(()=>{(async()=>{const {data}=await createClient().from('price_history').select('id,quantity,unit_price,total_price,purchased_at,product_variants(variant_name_ar,variant_name_en,amount,unit,brands(name_ar,name_en)),stores(name)').order('purchased_at',{ascending:false}).limit(200);setRows(data??[]);setLoading(false)})()},[]);
 return <BaytnaShell><div className="baytna-container"><section className="hero"><SectionLabel>PRICE HISTORY</SectionLabel><h1>اعرف السعر قبل <span className="accent">ما تشتري.</span></h1><p>كل عملية شراء بتضيف نقطة جديدة في تاريخك، علشان تقدر تقارن وتاخد قرار أذكى.</p></section><section className="section"><div className="content-card">{loading?<div className="loading-state">جاري تحميل الأسعار...</div>:!rows.length?<Empty description="لسه مفيش أسعار مسجلة. خلّص أول عملية شراء."/>:<div role="list" aria-label="تاريخ الأسعار">{rows.map(x=><div className="list-row" role="listitem" key={x.id}><div><div className="product-name">{x.product_variants?.variant_name_ar||x.product_variants?.variant_name_en}</div><div className="product-meta">{x.quantity} {x.product_variants?.unit||''} · {x.stores?.name||'بدون محل'} · {new Date(x.purchased_at).toLocaleDateString('ar-EG')}</div></div><div className="history-price"><Typography.Text strong>{x.unit_price??'—'} EGP</Typography.Text>{x.total_price!=null&&<Tag>الإجمالي {x.total_price} EGP</Tag>}</div></div>)}</div>}</div></section><section className="dark-section"><div className="baytna-container"><h2>كل عملية شراء بتعلّمك حاجة.</h2><p>احتفظ بالتاريخ، وقارن قبل المرة الجاية.</p></div></section></div></BaytnaShell>
}
