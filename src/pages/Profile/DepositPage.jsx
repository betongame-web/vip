import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';
import DepositWidget from '@/components/widgets/DepositWidget';

export default function DepositPage() {
  return (
    <BaseLayout>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="hidden md:block">
          <WalletSideMenu />
        </div>
        <div className="md:col-span-2">
          <DepositWidget />
        </div>
      </div>
    </BaseLayout>
  );
}
