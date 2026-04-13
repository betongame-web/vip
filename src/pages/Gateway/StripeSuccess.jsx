import BaseLayout from '@/components/layouts/BaseLayout';

export default function StripeSuccess() {
  return (
    <BaseLayout>
      <div className="card-surface p-8 text-center">
        <h1 className="text-3xl font-bold text-green-400">Stripe payment success</h1>
        <p className="mt-3 text-gray-300">This screen replaces the original Vue gateway success page.</p>
      </div>
    </BaseLayout>
  );
}
