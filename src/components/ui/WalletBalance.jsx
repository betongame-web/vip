import { currencyFormat } from '@/utils/formatters';

export default function WalletBalance({ wallet }) {
  if (!wallet) return null;
  return (
    <div className="card-surface p-4">
      <h3 className="mb-3 text-lg font-semibold">Wallet Balance</h3>
      <div className="grid gap-2 text-sm">
        <div className="flex justify-between">
          <span>Main balance</span>
          <span>{currencyFormat(wallet.balance || 0, wallet.currency || 'USD')}</span>
        </div>
        <div className="flex justify-between">
          <span>Withdrawal balance</span>
          <span>{currencyFormat(wallet.balance_withdrawal || 0, wallet.currency || 'USD')}</span>
        </div>
        <div className="flex justify-between">
          <span>Bonus balance</span>
          <span>{currencyFormat(wallet.balance_bonus || 0, wallet.currency || 'USD')}</span>
        </div>
      </div>
    </div>
  );
}
