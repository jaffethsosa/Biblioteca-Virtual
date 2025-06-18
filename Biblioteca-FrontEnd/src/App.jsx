import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Devoluciones from './pages/Devoluciones';
import LibrosPage from './pages/LibrosPage'
import './App.css'; 
import CrearLibroPage from './pages/CrearLibro';
import { useState } from 'react';

function App() {
  const [menuActivo, setMenuActivo] = useState(false);

  const toggleMenu = () => {
    setMenuActivo(!menuActivo);
  };

  return(
   <BrowserRouter>
     <nav className="navbar">
       <div className="menu-hamburguesa" onClick={toggleMenu} aria-label="Menú">
         <div></div>
         <div></div>
         <div></div>
       </div>
       <div className={`navbar-links ${menuActivo ? "active" : ""}`}>
         <Link to="/" onClick={() => setMenuActivo(false)}>📚 Inicio </Link>
         <Link to="/devoluciones" onClick={() => setMenuActivo(false)}>🔁 Ver Devoluciones</Link>
         <Link to="/crear" onClick={() => setMenuActivo(false)}>➕ Agregar Libro</Link>
       </div>
     </nav>

    <Routes>
      <Route path="/" element={<LibrosPage />} />
      <Route path="/devoluciones" element={<Devoluciones />} />
      <Route path="/crear" element={<CrearLibroPage/>} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
