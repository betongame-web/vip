import BaseLayout from '@/components/layouts/BaseLayout';

export default function VIP() {
  return (
    <BaseLayout>
      <div className="card-surface p-8">
        <h1 className="mb-3 text-3xl font-bold">VIP</h1>
        <p className="max-w-3xl text-sm text-gray-400">VIP screen scaffold. The Vue version depended on authenticated profile VIP payload.</p>
      </div>
    </BaseLayout>
  );
}
