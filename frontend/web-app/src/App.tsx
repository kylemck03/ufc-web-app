import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FighterForm from './components/FighterForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src="/512px-UFC_logo_White.svg.png" className="ufc-logo" alt="logo" />
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/predict" className="nav-link">Predict</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/predict" element={<FighterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;