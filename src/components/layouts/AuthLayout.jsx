import NavTopComponent from '@/components/nav/NavTopComponent';

export default function AuthLayout({ children }) {
  return (
    <>
      <NavTopComponent />
      <main className="mx-auto flex min-h-screen max-w-7xl items-start justify-center px-4 pb-8 pt-28">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </>
  );
}
