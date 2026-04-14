import ProviderSection from '@/components/casino/ProviderSection';

export default function ShowProviders({ providers = [] }) {
  return (
    <div className="space-y-6">
      {providers.map((provider) => (
        <ProviderSection key={provider.id || provider.name} provider={provider} />
      ))}
    </div>
  );
}
