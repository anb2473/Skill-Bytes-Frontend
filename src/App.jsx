import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Contact from "./pages/contact/Contact.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src="/icon-large.png" alt="Skill Bytes Logo" />
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
