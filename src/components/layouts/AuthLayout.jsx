import NavTopComponent from '@/components/nav/NavTopComponent';
import BottomNavComponent from '@/components/nav/BottomNavComponent';

export default function AuthLayout({ children }) {
  return (
    <>
      <NavTopComponent />

      <main className="mx-auto flex min-h-screen max-w-7xl items-start justify-center px-4 pb-24 pt-24 md:pb-10">
        <div className="w-full max-w-md">
          <div className="mb-6 rounded-3xl border border-white/10 bg-black/20 p-6 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Authentication</p>
            <h1 className="mt-2 text-2xl font-bold text-white">Account Access</h1>
            <p className="mt-2 text-sm leading-7 text-gray-300">
              Login, register, and recover your account from this secure frontend flow.
            </p>
          </div>

          {children}
        </div>
      </main>

      <BottomNavComponent />
    </>
  );
}