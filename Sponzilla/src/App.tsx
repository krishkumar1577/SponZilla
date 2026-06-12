import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import HomePage from './pages/home';
import ListEventPage from './pages/ListEvent';
import BrowseEventsWithSearchPage from './pages/BrowseEvents';
import ViewEvent from './pages/ViewEvent';
import AboutPage from './pages/About';
import PricingPage from './pages/Pricing';
import ContactPage from './pages/Contact';
import ContactWithHeaderPage from './pages/ContactWithHeader';
import LoginPage from './pages/Login';
import OAuthSuccessPage from './pages/OAuthSuccess';
import BrandDashboardPage from './pages/brand/BrandDashboard';
import ClubDashboardPage from './pages/club/ClubDashboard';
import FindClubsPage from './pages/brand/FindClubs';
import FindBrandsPage from './pages/club/FindBrands';
import AIPitchDeckGeneratorPage from './pages/club/AIPitchDeckGenerator';
import ClubProfilePage from './pages/ClubProfile';
import EventManagementPage from './pages/club/EventManagement';
import TermsOfServicePage from './pages/TermsOfService';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import MessagesPage from './pages/Messages';
import HelpPage from './pages/Help';
import BrandProfilePage from './pages/brand/BrandProfile';
import BrandLanding from './pages/brand/BrandLanding';
import ClubLanding from './pages/club/ClubLanding';
import SettingsPage from './pages/Settings';
import ClubSettings from './pages/club/ClubSettings';
import BrandSettings from './pages/brand/BrandSettings';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { Analytics } from "@vercel/analytics/react"
import './App.css';

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
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
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>
          <Analytics />
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;
