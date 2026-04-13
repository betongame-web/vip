import { NavLink } from 'react-router-dom';

const menuGroups = [
  {
    title: 'Main',
    items: [
      { to: '/', label: 'Home' },
      { to: '/casinos', label: 'Casino' },
      { to: '/sports', label: 'Sports' },
      { to: '/promotion', label: 'Promotions' },
      { to: '/support', label: 'Support' },
      { to: '/vip', label: 'VIP' },
    ],
  },
  {
    title: 'Profile',
    items: [
      { to: '/profile', label: 'Profile' },
      { to: '/profile/wallet', label: 'Wallet' },
      { to: '/profile/deposit', label: 'Deposit' },
      { to: '/profile/withdraw', label: 'Withdraw' },
      { to: '/profile/transactions', label: 'Transactions' },
      { to: '/profile/record', label: 'Records' },
      { to: '/profile/favorite', label: 'Favorites' },
      { to: '/profile/recents', label: 'Recents' },
      { to: '/profile/affiliate', label: 'Affiliate' },
    ],
  },
  {
    title: 'Terms',
    items: [
      { to: '/terms/conditions-reference', label: 'Conditions' },
      { to: '/terms/service', label: 'Service Terms' },
      { to: '/terms/privacy-policy', label: 'Privacy Policy' },
      { to: '/terms/bonus', label: 'Bonus Terms' },
      { to: '/terms/bonus-welcome', label: 'Welcome Bonus' },
    ],
  },
];

function linkClass(isActive) {
  return [
    'block rounded-xl px-4 py-3 text-sm font-medium transition',
    isActive
      ? 'border border-emerald-500/30 bg-emerald-500/10 text-white'
      : 'border border-transparent text-gray-300 hover:border-white/10 hover:bg-white/5 hover:text-white',
  ].join(' ');
}

export default function SideBarComponent() {
  return (
    <aside className="fixed left-0 top-[73px] hidden h-[calc(100vh-73px)] w-72 overflow-y-auto border-r border-white/5 bg-brandgray-800/95 px-4 py-5 md:block">
      <div className="space-y-5">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Navigation</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Quick Access Menu</h2>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            Use this menu to open casino, sports, profile, payments, and terms pages quickly.
          </p>
        </div>

        {menuGroups.map((group) => (
          <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <p className="px-2 pb-2 text-xs uppercase tracking-[0.18em] text-gray-400">
              {group.title}
            </p>

            <div className="space-y-2">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => linkClass(isActive)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}