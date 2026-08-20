'use client';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SectionLabel } from '../components/BaytnaShell';
export default function LoginPage(){const router=useRouter();const submit=async(v:{email:string;password:string})=>{const {error}=await createClient().auth.signInWithPassword(v);if(error){message.error(error.message);return}message.success('تم تسجيل الدخول');router.push('/')};return <main className="baytna-page auth-page"><Card className="auth-card"><SectionLabel>WELCOME BACK</SectionLabel><Typography.Title level={2}>أهلاً بيك في بيتنا.</Typography.Title><Typography.Paragraph>سجّل دخولك علشان تحفظ قوائمك ومشترياتك وأسعارك في مكان واحد.</Typography.Paragraph><Form layout="vertical" onFinish={submit}><Form.Item label="البريد الإلكتروني" name="email" rules={[{required:true,type:'email'}]}><Input size="large" /></Form.Item><Form.Item label="كلمة المرور" name="password" rules={[{required:true,min:6}]}><Input.Password size="large" /></Form.Item><Button type="primary" htmlType="submit" block size="large">تسجيل الدخول</Button><Link href="/signup"><Button type="link" block icon={<ArrowLeftOutlined/>}>إنشاء حساب جديد</Button></Link></Form></Card></main>}
