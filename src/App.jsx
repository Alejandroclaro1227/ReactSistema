import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlanetList from "./components/PlanetList";
import PlanetDetail from "./components/PlanetDetail";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Elementos de fondo dinámico */}
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>
      <div className="nebula nebula-3"></div>
      <div className="comet"></div>
      
      <Routes>
        <Route path="/" element={<PlanetList />} />
        <Route path="/planet/:id" element={<PlanetDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
