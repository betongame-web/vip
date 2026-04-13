import BaseLayout from '@/components/layouts/BaseLayout';

export default function StripeCancel() {
  return (
    <BaseLayout>
      <div className="card-surface p-8 text-center">
        <h1 className="text-3xl font-bold text-red-400">Stripe payment cancelled</h1>
        <p className="mt-3 text-gray-300">This screen replaces the original Vue gateway cancel page.</p>
      </div>
    </BaseLayout>
  );
}
