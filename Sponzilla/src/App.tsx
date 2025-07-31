import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import ListEventPage from './pages/ListEvent';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list-event" element={<ListEventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
