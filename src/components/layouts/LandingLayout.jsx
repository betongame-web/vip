import NavTopComponent from '@/components/nav/NavTopComponent';
import BottomNavComponent from '@/components/nav/BottomNavComponent';
import FooterComponent from '@/components/ui/FooterComponent';

export default function LandingLayout({ children }) {
  return (
    <>
      <NavTopComponent />

      <main className="mx-auto min-h-screen max-w-7xl px-4 pb-24 pt-24 md:pb-10">
        {children}
        <FooterComponent />
      </main>

      <BottomNavComponent />
    </>
  );
}