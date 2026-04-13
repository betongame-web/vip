import NavTopComponent from '@/components/nav/NavTopComponent';
import SideBarComponent from '@/components/nav/SideBarComponent';
import BottomNavComponent from '@/components/nav/BottomNavComponent';
import FooterComponent from '@/components/ui/FooterComponent';
import CookiesComponent from '@/components/ui/CookiesComponent';

export default function BaseLayout({ children }) {
  return (
    <>
      <NavTopComponent />
      <SideBarComponent />
      <div className="pt-[74px] md:ml-64">
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-6">
          {children}
          <FooterComponent />
        </main>
      </div>
      <BottomNavComponent />
      <CookiesComponent />
    </>
  );
}
