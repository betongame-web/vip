import NavTopComponent from '@/components/nav/NavTopComponent';

export default function GameLayout({ children }) {
  return (
    <>
      <NavTopComponent />
      <main className="min-h-screen px-4 pb-8 pt-24">{children}</main>
    </>
  );
}
