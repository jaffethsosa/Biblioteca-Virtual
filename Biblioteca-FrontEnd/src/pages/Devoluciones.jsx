// src/pages/Devoluciones.jsx
import { useEffect, useState } from "react";
import { verDevoluciones } from "../services/libroService";
import DevolucionItem from "../components/DevolucionItem";
import "./styles/Devoluciones.css";

function Devoluciones() {
  const [devoluciones, setDevoluciones] = useState([]);

  useEffect(() => {
    verDevoluciones().then(res => setDevoluciones(res.data));
  }, []);

  return (
    <div className="contenedor">
      <h1>🔁 Historial de Devoluciones</h1>
      <div className="contenedor-devoluciones">
      {devoluciones.length === 0 ? (
        <p>No hay devoluciones registradas aún.</p>
      ) : (
        devoluciones.map((libro, index) => (
          <DevolucionItem key={index} libro={libro} />
        ))
      )}
      </div>
    </div>
  );
}

export default Devoluciones;

