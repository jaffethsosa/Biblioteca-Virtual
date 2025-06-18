
import "./styles/DevolucionesItem.css";

const DevolucionItem = ({ libro }) => {
  return (
    <div className="devolucion-item">
      <div>
        <h4>Libro: {libro.titulo}</h4>
        <p><strong>Autor:</strong> {libro.autor}</p>
        <p><strong>Fecha:</strong> {new Date(libro.fechaDevolucion).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default DevolucionItem;
