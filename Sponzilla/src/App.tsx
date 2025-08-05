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
import FindClubsPage from './pages/FindClubs';
import MessagesPage from './pages/Messages';
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
          <Route path="/find-clubs" element={<FindClubsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
