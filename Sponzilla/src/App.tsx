import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import ListEventPage from './pages/ListEvent';
import BrowseEventsWithSearchPage from './pages/BrowseEvents';
import ViewEvent from './pages/ViewEvent';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import ContactWithHeaderPage from './pages/ContactWithHeader';
import LoginPage from './pages/Login';
import BrandDashboardPage from './pages/BrandDashboard';
import ClubDashboardPage from './pages/ClubDashboard';
import FindClubsPage from './pages/FindClubs';
import FindBrandsPage from './pages/FindBrands';
import AIPitchDeckGeneratorPage from './pages/AIPitchDeckGenerator';
import ClubProfilePage from './pages/ClubProfile';
import EventManagementPage from './pages/EventManagement';
import TermsOfServicePage from './pages/TermsOfService';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import MessagesPage from './pages/Messages';
import HelpPage from './pages/Help';
import BrandProfilePage from './pages/BrandProfile';
import SettingsPage from './pages/Settings';
import './App.css';

function App() {
  return (
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
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
