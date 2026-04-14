import { Link } from 'react-router-dom';

export default function MakeDeposit() {
  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">Quick Deposit</p>
      <h3 className="mt-2 text-2xl font-bold text-white">Fund your wallet faster</h3>
      <p className="mt-3 text-sm leading-7 text-gray-200">
        Open the deposit page, choose your available gateway, and continue to wallet funding.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to="/profile/deposit"
          className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          Make Deposit
        </Link>
        <Link
          to="/profile/wallet"
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-100 transition hover:bg-white/10"
        >
          Wallet
        </Link>
      </div>
    </div>
  );
}
