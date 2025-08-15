import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import HomePage from './pages/home';
import ListEventPage from './pages/ListEvent';
import BrowseEventsWithSearchPage from './pages/BrowseEvents';
import ViewEvent from './pages/ViewEvent';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import ContactWithHeaderPage from './pages/ContactWithHeader';
import LoginPage from './pages/Login';
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
import UserTypeSwitcher from './components/ui/UserTypeSwitcher';
import { Analytics } from "@vercel/analytics/react"
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/list-event" element={<ListEventPage />} />
            <Route path="/browse-events" element={<BrowseEventsWithSearchPage />} />
            <Route path="/view-event/:eventId" element={<ViewEvent />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact-with-header" element={<ContactWithHeaderPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/brand-dashboard" element={<BrandDashboardPage />} />
            <Route path="/club-dashboard" element={<ClubDashboardPage />} />
            <Route path="/find-clubs" element={<FindClubsPage />} />
            <Route path="/find-brands" element={<FindBrandsPage />} />
            <Route path="/ai-pitch-deck" element={<AIPitchDeckGeneratorPage />} />
            <Route path="/club-profile" element={<ClubProfilePage />} />
            <Route path="/event-management" element={<EventManagementPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/brand-profile" element={<BrandProfilePage />} />
            <Route path="/brand-landing" element={<BrandLanding />} />
            <Route path="/club-landing" element={<ClubLanding />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/club-settings" element={<ClubSettings />} />
            <Route path="/brand-settings" element={<BrandSettings />} />
          </Routes>
          
          {/* User Type Switcher for Demo (remove in production) */}
          <UserTypeSwitcher />
        </div>
        <Analytics />
      </Router>
    </UserProvider>
  );
}

export default App;
