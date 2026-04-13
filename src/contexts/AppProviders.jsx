import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { SportsbookProvider } from '@/contexts/SportsbookContext';

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <SportsbookProvider>{children}</SportsbookProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
