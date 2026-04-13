import { useEffect, useState } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';
import EmptyState from '@/components/common/EmptyState';
import http from '@/services/http';
import { currencyFormat } from '@/utils/formatters';

export default function AffiliatePage() {
  const [data, setData] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const [affiliateRes, walletRes] = await Promise.all([
          http.get('/profile/affiliates'),
          http.get('/profile/wallet'),
        ]);
        if (!ignore) {
          setData(affiliateRes.data);
          setWallet(walletRes.data?.wallet || null);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <BaseLayout>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="hidden md:block">
          <WalletSideMenu />
        </div>
        <div className="md:col-span-2">
          {loading ? <div className="card-surface p-6">Loading affiliate data...</div> : null}
          {!loading && data ? (
            <div className="space-y-4">
              <div className="card-surface p-5">
                <h1 className="mb-4 text-2xl font-bold">Affiliate Dashboard</h1>
                <p className="text-sm text-gray-400">
                  This React screen keeps the same backend integration point and replaces the very large modal-heavy Vue page with a simpler dashboard.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card-surface p-4">
                  <p className="text-sm text-gray-400">CPA commission</p>
                  <p className="mt-2 text-3xl font-bold text-yellow-400">
                    {currencyFormat(data?.user?.affiliate_cpa || 0, wallet?.currency || 'USD')}
                  </p>
                </div>
                <div className="card-surface p-4">
                  <p className="text-sm text-gray-400">Revenue share</p>
                  <p className="mt-2 text-3xl font-bold text-yellow-400">
                    {data?.user?.affiliate_revenue_share || 0}%
                  </p>
                </div>
              </div>

              <div className="card-surface p-4">
                <h2 className="mb-3 text-lg font-semibold">API snapshot</h2>
                <pre className="overflow-auto rounded-xl bg-black/30 p-4 text-xs text-gray-300">
{JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          ) : null}
          {!loading && !data ? <EmptyState title="No affiliate data" description="The affiliate endpoint did not return data for this user." /> : null}
        </div>
      </div>
    </BaseLayout>
  );
}
