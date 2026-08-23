'use client';
import { useEffect, useState } from 'react';
import { Card, Empty, Tag, Typography } from 'antd';
import { createClient } from '@/lib/supabase';

export default function HistoryPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const s = createClient();
      const { data } = await s
        .from('price_history')
        .select('id,quantity,unit_price,total_price,purchased_at,product_variants(variant_name_ar,variant_name_en,amount,unit,brands(name_ar,name_en)),stores(name)')
        .order('purchased_at', { ascending: false })
        .limit(200);
      setRows(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <main className="baytna-page">
      <div className="baytna-container">
        <section className="hero">
          <h1>تاريخ الأسعار</h1>
          <p>كل مرة اشتريت فيها منتج، السعر بيتحفظ علشان تعرف المرة الجاية أغلى ولا أرخص.</p>
        </section>
        <Card loading={loading}>
          {!rows.length && !loading ? (
            <Empty description="لسه مفيش أسعار مسجلة. خلّص أول عملية شراء." />
          ) : (
            <div role="list" aria-label="تاريخ الأسعار">
              {rows.map((x) => (
                <div className="list-row" role="listitem" key={x.id}>
                  <div>
                    <div className="product-name">
                      {x.product_variants?.variant_name_ar || x.product_variants?.variant_name_en}
                    </div>
                    <div className="product-meta">
                      {x.quantity} {x.product_variants?.unit || ''} · {x.stores?.name || 'بدون محل'} ·{' '}
                      {new Date(x.purchased_at).toLocaleDateString('ar-EG')}
                    </div>
                  </div>
                  <div>
                    <Typography.Text strong>{x.unit_price ?? '—'} EGP</Typography.Text>
                    {x.total_price != null && (
                      <Tag style={{ marginInlineStart: 8 }}>
                        الإجمالي {x.total_price} EGP
                      </Tag>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
