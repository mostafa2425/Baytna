'use client';
import { useState } from 'react';
import { Card, Upload, message, Typography } from 'antd';
import { InboxOutlined, FileImageOutlined } from '@ant-design/icons';
import { BaytnaShell, SectionLabel } from '../components/BaytnaShell';
import { createClient } from '@/lib/supabase';

export default function ReceiptsPage(){
 const [loading,setLoading]=useState(false);
 const upload=async(file:File)=>{setLoading(true);const s=createClient();const {data:{user}}=await s.auth.getUser();if(!user){message.info('سجّل الدخول أولاً');setLoading(false);return false}const path=`${user.id}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;const {error}=await s.storage.from('receipts').upload(path,file,{upsert:false});if(error)message.error(error.message);else{await s.from('receipts').insert({user_id:user.id,storage_path:path});message.success('تم حفظ الفاتورة')}setLoading(false);return false};
 return <BaytnaShell><div className="baytna-container"><section className="hero"><SectionLabel>RECEIPTS</SectionLabel><h1>خلي فواتيرك <span className="accent">معاك.</span></h1><p>ارفع صورة الريسيت وخليها مرتبطة بحسابك بدل ما تضيع وسط صور الموبايل.</p></section><section className="section"><Card className="receipt-card"><Upload.Dragger className="receipt-drop" accept="image/*" beforeUpload={upload} showUploadList={false} disabled={loading}><p className="ant-upload-drag-icon"><InboxOutlined/></p><p className="ant-upload-text">اسحب صورة الفاتورة هنا أو اضغط للاختيار</p><p className="ant-upload-hint">JPG أو PNG · ملفاتك خاصة بحسابك</p></Upload.Dragger><Typography.Paragraph type="secondary" style={{marginTop:20,marginBottom:0}}><FileImageOutlined/> الصور بتتحفظ داخل مساحة حسابك فقط.</Typography.Paragraph></Card></section></div></BaytnaShell>
}
