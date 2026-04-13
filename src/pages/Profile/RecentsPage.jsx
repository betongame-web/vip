import { useEffect, useState } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';
import CasinoGameCard from '@/components/casino/CasinoGameCard';
import EmptyState from '@/components/common/EmptyState';
import http from '@/services/http';

export default function RecentsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    http.get('/profile/recents')
      .then(({ data }) => {
        if (!ignore) {
          setItems(data?.recents?.data || data?.recents || data?.data || []);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
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
          <div className="card-surface p-5">
            <h1 className="mb-4 text-2xl font-bold">Recent Games</h1>
            {loading ? <p>Loading recent games...</p> : null}
            {!loading && items.length ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {items.map((item) => (
                  <CasinoGameCard key={item.id || item.game_code} game={item.game || item} />
                ))}
              </div>
            ) : null}
            {!loading && !items.length ? <EmptyState title="No recent games" description="No recent game records were returned for this profile." /> : null}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
