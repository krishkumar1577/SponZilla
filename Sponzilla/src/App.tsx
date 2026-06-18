import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import HomePage from './pages/home';
import ProtectedRoute from './components/layout/ProtectedRoute';
import './App.css';

const ListEventPage = lazy(() => import('./pages/ListEvent'));
const BrowseEventsWithSearchPage = lazy(() => import('./pages/BrowseEvents'));
const ViewEvent = lazy(() => import('./pages/ViewEvent'));
const AboutPage = lazy(() => import('./pages/About'));
const PricingPage = lazy(() => import('./pages/Pricing'));
const ContactPage = lazy(() => import('./pages/Contact'));
const ContactWithHeaderPage = lazy(() => import('./pages/ContactWithHeader'));
const LoginPage = lazy(() => import('./pages/Login'));
const OAuthSuccessPage = lazy(() => import('./pages/OAuthSuccess'));
const RoleSelectionPage = lazy(() => import('./pages/RoleSelection'));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const BrandDashboardPage = lazy(() => import('./pages/brand/BrandDashboard'));
const ClubDashboardPage = lazy(() => import('./pages/club/ClubDashboard'));
const FindClubsPage = lazy(() => import('./pages/brand/FindClubs'));
const FindBrandsPage = lazy(() => import('./pages/club/FindBrands'));
const AIPitchDeckGeneratorPage = lazy(() => import('./pages/club/AIPitchDeckGenerator'));
const ClubProfilePage = lazy(() => import('./pages/ClubProfile'));
const EventManagementPage = lazy(() => import('./pages/club/EventManagement'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicy'));
const MessagesPage = lazy(() => import('./pages/Messages'));
const HelpPage = lazy(() => import('./pages/Help'));
const BrandProfilePage = lazy(() => import('./pages/brand/BrandProfile'));
const BrandLanding = lazy(() => import('./pages/brand/BrandLanding'));
const ClubLanding = lazy(() => import('./pages/club/ClubLanding'));
const SettingsPage = lazy(() => import('./pages/Settings'));
const ClubSettings = lazy(() => import('./pages/club/ClubSettings'));
const BrandSettings = lazy(() => import('./pages/brand/BrandSettings'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <Suspense fallback={null}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/list-event" element={<ListEventPage />} />
                <Route path="/browse-events" element={<BrowseEventsWithSearchPage />} />
                <Route path="/view-event/:eventId" element={<ViewEvent />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/contact-with-header" element={<ContactWithHeaderPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/oauth-success" element={<OAuthSuccessPage />} />
                <Route path="/role-selection" element={<RoleSelectionPage />} />
                <Route path="/onboarding/club" element={<OnboardingPage role="club" />} />
                <Route path="/onboarding/brand" element={<OnboardingPage role="brand" />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/brand-landing" element={<BrandLanding />} />
                <Route path="/club-landing" element={<ClubLanding />} />

                {/* Profile views (could be public or authenticated, keeping them public for now) */}
                <Route path="/club-profile" element={<ClubProfilePage />} />
                <Route path="/club-profile/:clubId" element={<ClubProfilePage />} />
                <Route path="/brand-profile" element={<BrandProfilePage />} />
                <Route path="/brand-profile/:brandId" element={<BrandProfilePage />} />

                {/* Protected Routes: Brand Only */}
                <Route path="/brand-dashboard" element={<ProtectedRoute allowedRoles={['brand']}><BrandDashboardPage /></ProtectedRoute>} />
                <Route path="/find-clubs" element={<ProtectedRoute allowedRoles={['brand']}><FindClubsPage /></ProtectedRoute>} />
                <Route path="/brand-settings" element={<ProtectedRoute allowedRoles={['brand']}><BrandSettings /></ProtectedRoute>} />

                {/* Protected Routes: Club Only */}
                <Route path="/club-dashboard" element={<ProtectedRoute allowedRoles={['club']}><ClubDashboardPage /></ProtectedRoute>} />
                <Route path="/find-brands" element={<ProtectedRoute allowedRoles={['club']}><FindBrandsPage /></ProtectedRoute>} />
                <Route path="/ai-pitch-deck" element={<ProtectedRoute allowedRoles={['club']}><AIPitchDeckGeneratorPage /></ProtectedRoute>} />
                <Route path="/event-management/:eventId" element={<ProtectedRoute allowedRoles={['club']}><EventManagementPage /></ProtectedRoute>} />
                <Route path="/club-settings" element={<ProtectedRoute allowedRoles={['club']}><ClubSettings /></ProtectedRoute>} />

                {/* Protected Routes: Authenticated Only (Brand or Club) */}
                <Route path="/messages" element={<ProtectedRoute allowedRoles={['brand', 'club']}><MessagesPage /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute allowedRoles={['brand', 'club']}><SettingsPage /></ProtectedRoute>} />

                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;
