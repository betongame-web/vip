import { useEffect, useState } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';
import WalletBalance from '@/components/ui/WalletBalance';
import EmptyState from '@/components/common/EmptyState';
import http from '@/services/http';
import { currencyFormat } from '@/utils/formatters';

export default function WalletPage() {
  const [wallet, setWallet] = useState(null);
  const [myWallets, setMyWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function loadWallet() {
      try {
        const [walletRes, myWalletRes] = await Promise.all([
          http.get('/profile/wallet'),
          http.get('/profile/mywallet').catch(() => ({ data: { wallets: [] } })),
        ]);
        if (!ignore) {
          setWallet(walletRes.data?.wallet || null);
          setMyWallets(myWalletRes.data?.wallets || myWalletRes.data?.data || []);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadWallet();
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
        <div className="md:col-span-2 space-y-4">
          {loading ? <div className="card-surface p-6">Loading wallet...</div> : null}
          {!loading && wallet ? (
            <>
              <WalletBalance wallet={wallet} />
              <div className="card-surface p-4">
                <h2 className="mb-4 text-xl font-semibold">Wallet details</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-sm text-gray-400">Currency</p>
                    <p className="mt-1 text-lg font-semibold">{wallet.currency}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-sm text-gray-400">Symbol</p>
                    <p className="mt-1 text-lg font-semibold">{wallet.symbol}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-sm text-gray-400">Main balance</p>
                    <p className="mt-1 text-lg font-semibold">{currencyFormat(wallet.balance || 0, wallet.currency)}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-sm text-gray-400">Available withdrawal</p>
                    <p className="mt-1 text-lg font-semibold">{currencyFormat(wallet.balance_withdrawal || 0, wallet.currency)}</p>
                  </div>
                </div>
              </div>

              {myWallets.length ? (
                <div className="card-surface p-4">
                  <h2 className="mb-4 text-xl font-semibold">Selectable wallets</h2>
                  <div className="space-y-3">
                    {myWallets.map((item) => (
                      <div key={item.id} className="rounded-xl border border-white/10 p-4">
                        <p className="font-semibold">{item.name || item.currency || `Wallet #${item.id}`}</p>
                        <p className="text-sm text-gray-400">{item.currency || '—'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
          {!loading && !wallet ? <EmptyState title="Wallet not found" description="The backend did not return profile wallet data." /> : null}
        </div>
      </div>
    </BaseLayout>
  );
}
