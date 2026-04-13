import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppProviders from '@/contexts/AppProviders';
import RequireAuth from '@/router/RequireAuth';

import HomePage from '@/pages/Home/HomePage';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import ResetPassword from '@/pages/Auth/ResetPassword';

import StripeSuccess from '@/pages/Gateway/StripeSuccess';
import StripeCancel from '@/pages/Gateway/StripeCancel';

import SupportPage from '@/pages/Home/SupportPage';
import SupportCenterPage from '@/pages/Home/SupportCenterPage';
import PromotionPage from '@/pages/Home/PromotionPage';
import BonusPage from '@/pages/Home/BonusPage';
import AwardsPage from '@/pages/Home/AwardsPage';
import EventsPage from '@/pages/Home/EventsPage';
import VipPage from '@/pages/Home/VipPage';
import LandingPage from '@/pages/Landing/LandingPage';

import SportPage from '@/pages/Sport/SportPage';
import SportLivePage from '@/pages/Sport/SportLivePage';
import SportCalendarPage from '@/pages/Sport/SportCalendarPage';
import SportSearchPage from '@/pages/Sport/SportSearchPage';
import SportFavoritesPage from '@/pages/Sport/SportFavoritesPage';
import SportSinglePage from '@/pages/Sport/SportSinglePage';
import SportBetsPage from '@/pages/Sport/SportBetsPage';
import SportBettingFeedPage from '@/pages/Sport/SportBettingFeedPage';

import ProfilePage from '@/pages/Profile/ProfilePage';
import WalletPage from '@/pages/Profile/WalletPage';
import DepositPage from '@/pages/Profile/DepositPage';
import WithdrawPage from '@/pages/Profile/WithdrawPage';
import TransactionPage from '@/pages/Profile/TransactionPage';
import RecordPage from '@/pages/Profile/RecordPage';
import FavoritePage from '@/pages/Profile/FavoritePage';
import RecentsPage from '@/pages/Profile/RecentsPage';
import AffiliatePage from '@/pages/Profile/AffiliatePage';

import CassinoListPage from '@/pages/Cassino/CassinoListPage';
import CasinoPlayPage from '@/pages/Cassino/CasinoPlayPage';
import CassinoSearch from '@/pages/Cassino/CassinoSearch';

import ConditionsReference from '@/pages/Terms/ConditionsReference';
import ServiceTerms from '@/pages/Terms/ServiceTerms';
import PrivacyPolicy from '@/pages/Terms/PrivacyPolicy';
import BonusTerms from '@/pages/Terms/BonusTerms';
import WelcomeBonus from '@/pages/Terms/WelcomeBonus';

import DataPage from '@/pages/ApiData/DataPage';

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:action" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/:code" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/stripe/success" element={<StripeSuccess />} />
          <Route path="/stripe/cancel" element={<StripeCancel />} />

          <Route path="/support" element={<SupportPage />} />
          <Route path="/support-center" element={<SupportCenterPage />} />
          <Route path="/promotion" element={<PromotionPage />} />
          <Route path="/bonus" element={<BonusPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/vip" element={<VipPage />} />
          <Route path="/landing/spin" element={<LandingPage />} />

          <Route path="/sports" element={<SportPage />} />
          <Route path="/sports/live" element={<SportLivePage />} />
          <Route path="/sports/calendar" element={<SportCalendarPage />} />
          <Route path="/sports/search" element={<SportSearchPage />} />
          <Route path="/sports/favorites" element={<SportFavoritesPage />} />
          <Route path="/sports/event/:id" element={<SportSinglePage />} />
          <Route path="/sports/bets" element={<SportBetsPage />} />
          <Route path="/sports/feed" element={<SportBettingFeedPage />} />

          <Route path="/casinos" element={<HomePage />} />
          <Route path="/games/play/:id/:slug" element={<CasinoPlayPage />} />
          <Route path="/casino/provider/:provider/category/:category" element={<CassinoListPage />} />
          <Route path="/casino/search" element={<CassinoSearch />} />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/wallet"
            element={
              <RequireAuth>
                <WalletPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/deposit"
            element={
              <RequireAuth>
                <DepositPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/withdraw"
            element={
              <RequireAuth>
                <WithdrawPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/transactions"
            element={
              <RequireAuth>
                <TransactionPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/record"
            element={
              <RequireAuth>
                <RecordPage />
              </RequireAuth>
            }
          />
          <Route
            path="/records"
            element={
              <RequireAuth>
                <RecordPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/favorite"
            element={
              <RequireAuth>
                <FavoritePage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/recents"
            element={
              <RequireAuth>
                <RecentsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/affiliate"
            element={
              <RequireAuth>
                <AffiliatePage />
              </RequireAuth>
            }
          />

          <Route path="/terms/conditions-reference" element={<ConditionsReference />} />
          <Route path="/terms/service" element={<ServiceTerms />} />
          <Route path="/terms/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms/bonus" element={<BonusTerms />} />
          <Route path="/terms/bonus-welcome" element={<WelcomeBonus />} />

          <Route path="/datapage" element={<DataPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}