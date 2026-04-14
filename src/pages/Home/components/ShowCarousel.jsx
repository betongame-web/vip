import { getStorageUrl } from '@/utils/url';

export default function ShowCarousel({ banners = [] }) {
  if (!banners.length) return null;

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {banners.slice(0, 4).map((banner, index) => (
        <a
          key={banner.id || `${banner.title || 'banner'}-${index}`}
          href={banner.link || '#'}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        >
          <img
            src={getStorageUrl(banner.image)}
            alt={banner.title || 'Banner'}
            className="h-[220px] w-full object-cover"
          />
        </a>
      ))}
    </section>
  );
}
