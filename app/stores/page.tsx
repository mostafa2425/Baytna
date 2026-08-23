'use client';
import { useEffect, useState } from 'react';
import { Button, Empty, Input, Modal, message } from 'antd';
import { PlusOutlined, ShopOutlined } from '@ant-design/icons';
import { BaytnaShell, SectionLabel } from '../components/BaytnaShell';
import { createClient } from '@/lib/supabase';

export default function StoresPage(){
 const [stores,setStores]=useState<any[]>([]),[open,setOpen]=useState(false),[name,setName]=useState('');
 const load=async()=>{const {data}=await createClient().from('stores').select('*').order('name');setStores(data??[])};useEffect(()=>{load()},[]);
 const add=async()=>{if(!name.trim())return;const s=createClient();const {data:{user}}=await s.auth.getUser();if(!user)return;const {error}=await s.from('stores').insert({user_id:user.id,name:name.trim()});if(error)message.error(error.message);else{message.success('تم حفظ المحل');setName('');setOpen(false);load()}};
 return <BaytnaShell><div className="baytna-container"><section className="hero"><SectionLabel>YOUR STORES</SectionLabel><h1>أماكنك، <span className="accent">على طول.</span></h1><p>احفظ المحلات اللي بتشتري منها واربطها بتاريخ مشترياتك وأسعارك.</p></section><section className="section"><div className="section-title"><div><SectionLabel>STORES</SectionLabel><h2>محلاتك</h2></div><Button type="primary" icon={<PlusOutlined/>} onClick={()=>setOpen(true)}>إضافة محل</Button></div>{!stores.length?<div className="content-card"><Empty description="مفيش محلات محفوظة"/></div>:<div className="product-grid">{stores.map(x=><article className="product-card" key={x.id}><span className="quick-icon"><ShopOutlined/></span><div><h3>{x.name}</h3><div className="english">{x.type||'محل'}</div></div><span className="status-pill">محفوظ</span></article>)}</div>}</section></div><Modal title="إضافة محل" open={open} onCancel={()=>setOpen(false)} onOk={add} okText="حفظ" cancelText="إلغاء"><Input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="مثلاً: كارفور المعادي"/></Modal></BaytnaShell>
}
