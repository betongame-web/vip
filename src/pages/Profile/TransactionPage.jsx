import { useEffect, useState } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';
import EmptyState from '@/components/common/EmptyState';
import http from '@/services/http';
import { currencyFormat, statusLabel } from '@/utils/formatters';

export default function TransactionPage() {
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [withdraws, setWithdraws] = useState(null);
  const [deposits, setDeposits] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      setLoading(true);
      try {
        const [walletRes, withdrawRes, depositRes] = await Promise.all([
          http.get('/profile/wallet'),
          http.get('/wallet/withdraw'),
          http.get('/wallet/deposit'),
        ]);
        if (!ignore) {
          setWallet(walletRes.data?.wallet || null);
          setWithdraws(withdrawRes.data?.withdraws || withdrawRes.data?.data || withdrawRes.data || null);
          setDeposits(depositRes.data?.deposits || depositRes.data?.data || depositRes.data || null);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadData();
    return () => {
      ignore = true;
    };
  }, []);

  const withdrawRows = withdraws?.data || [];
  const depositRows = deposits?.data || [];

  return (
    <BaseLayout>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="hidden md:block">
          <WalletSideMenu />
        </div>

        <div className="md:col-span-2">
          {loading ? <div className="card-surface p-6">Loading transactions...</div> : null}

          {!loading && wallet ? (
            <div className="space-y-6">
              <section className="card-surface p-4 table-shell">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold">Withdrawal List</h2>
                  <p className="text-sm text-gray-400">Below is the list of all requested withdrawals.</p>
                </div>
                {withdrawRows.length ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Proof</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawRows.map((item, index) => (
                        <tr key={item.id || index}>
                          <td>{item.proof ? 'Available' : 'Processing'}</td>
                          <td className="uppercase">{item.type}</td>
                          <td>{currencyFormat(item.amount || 0, item.currency || wallet.currency)}</td>
                          <td>{statusLabel(item.status)}</td>
                          <td>{item.dateHumanReadable || item.created_at || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <EmptyState title="No withdrawals" description="No withdrawal records were returned." />
                )}
              </section>

              <section className="card-surface p-4 table-shell">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold">Deposits List</h2>
                  <p className="text-sm text-gray-400">List of deposits made.</p>
                </div>
                {depositRows.length ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {depositRows.map((item, index) => (
                        <tr key={item.id || index}>
                          <td className="uppercase">{item.type}</td>
                          <td>{currencyFormat(item.amount || 0, item.currency || wallet.currency)}</td>
                          <td>{statusLabel(item.status)}</td>
                          <td>{item.dateHumanReadable || item.created_at || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <EmptyState title="No deposits" description="No deposit records were returned." />
                )}
              </section>
            </div>
          ) : null}

          {!loading && !wallet ? <EmptyState title="Wallet missing" description="Could not load wallet-linked transaction data." /> : null}
        </div>
      </div>
    </BaseLayout>
  );
}
