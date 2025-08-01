import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import ListEventPage from './pages/ListEvent';
import BrowseEventsWithSearchPage from './pages/BrowseEvents';
import ViewEvent from './pages/ViewEvent';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
