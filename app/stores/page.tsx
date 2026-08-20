'use client';
import { useEffect, useState } from 'react';
import { Button, Card, Empty, Input, Modal, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createClient } from '@/lib/supabase';

export default function StoresPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const load = async () => {
    const { data } = await createClient().from('stores').select('*').order('name');
    setStores(data ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!name.trim()) return;
    const s = createClient();
    const {
      data: { user },
    } = await s.auth.getUser();
    if (!user) return;

    const { error } = await s.from('stores').insert({ user_id: user.id, name: name.trim() });
    if (error) {
      message.error(error.message);
    } else {
      message.success('تم حفظ المحل');
      setName('');
      setOpen(false);
      load();
    }
  };

  return (
    <main className="baytna-page">
      <div className="baytna-container">
        <section className="hero">
          <h1>المحلات</h1>
          <p>احفظ الأماكن اللي بتشتري منها علشان تربطها بأسعارك ومشترياتك.</p>
        </section>
        <Card
          title="محلاتك"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
              إضافة محل
            </Button>
          }
        >
          {!stores.length ? (
            <Empty description="مفيش محلات محفوظة" />
          ) : (
            <div role="list" aria-label="المحلات">
              {stores.map((x) => (
                <div className="list-row" role="listitem" key={x.id}>
                  <Typography.Text strong>{x.name}</Typography.Text>
                  <Typography.Text type="secondary">{x.type || 'محل'}</Typography.Text>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
      <Modal
        title="إضافة محل"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={add}
        okText="حفظ"
        cancelText="إلغاء"
      >
        <Input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثلاً: كارفور المعادي"
        />
      </Modal>
    </main>
  );
}
