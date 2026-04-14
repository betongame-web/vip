import { Link } from 'react-router-dom';

export default function FooterComponent() {
  return (
    <footer className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-6">
      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Platform Footer</p>
          <h3 className="mt-2 text-xl font-bold text-white">VIPERPRO React Frontend</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-300">
            Customer-facing React + Vite frontend with casino pages, sportsbook flow,
            wallet pages, profile center, landing spin, and static policy sections.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-white">Quick Links</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-gray-300">
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/casinos" className="hover:text-white">Casino</Link>
              <Link to="/sports" className="hover:text-white">Sports</Link>
              <Link to="/profile" className="hover:text-white">Profile</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Terms</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-gray-300">
              <Link to="/terms/service" className="hover:text-white">Service Terms</Link>
              <Link to="/terms/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms/bonus" className="hover:text-white">Bonus Terms</Link>
              <Link to="/support" className="hover:text-white">Support</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4 text-xs text-gray-400">
        © 2026 VIPERPRO React Frontend. All rights reserved.
      </div>
    </footer>
  );
}