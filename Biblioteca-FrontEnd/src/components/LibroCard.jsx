import React from "react";
import "./styles/LibroCard.css"; 

const LibroCard = ({ libro, onPrestar, onDevolver, onEliminar }) => {
  return (
    <div className="libro-card">
      <h3>{libro.titulo}</h3>
      <p><strong>Autor:</strong> {libro.autor}</p>
      <p><strong>Año:</strong> {libro.anio}</p>
      <p><strong>Categoría:</strong> {libro.categoria}</p>
      <p><strong>Estado:</strong> {libro.disponible ? "✅ Disponible" : "❌ Prestado"}</p>

      <div className="acciones">
        {libro.disponible ? (
          <button onClick={() => onPrestar(libro.id)}>📕 Prestar</button>
        ) : (
          <button onClick={() => onDevolver(libro.id)}>🔁 Devolver</button>
        )}
        <button className="eliminar-btn" onClick={() => onEliminar(libro.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default LibroCard;
