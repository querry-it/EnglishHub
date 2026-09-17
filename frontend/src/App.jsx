import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Placeholder fallback for remaining routes */}
        <Route path="*" element={<Home />} />
      </Routes>
      <footer>
        <div className="container py-6 text-center text-sm text-slate-400 space-y-1">
          <p>© 2026 EnglishHub — Smart English Learning Management System.</p>
          <p className="text-xs text-amber-400/90 font-medium">
            ⚠️ Dữ liệu mô phỏng phục vụ mục đích học tập
          </p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
