import React, { useState } from "react";
import "./styles/CrearLibro.css";

const CrearLibroPage = () => {
    const [form, setForm] = useState({
        titulo: "",
        autor: "",
        anio: "",
        categoria: "",
        diponible: true,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/libros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            if (!response.ok) {
                throw new Error("Error al crear el libro");
            }
            alert("Libro creado exitosamente.");
            setForm({ titulo: "", autor: "", anio: "", categoria: "" });
        } catch (error) {
            alert("Hubo un error al crear el libro.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="crear-libro-container">
            <h1>Crear Libro</h1>
            <form onSubmit={handleSubmit} className="crear-libro-form">
                <label>
                    Título:
                    <input
                        type="text"
                        name="titulo"
                        value={form.titulo}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Autor:
                    <input
                        type="text"
                        name="autor"
                        value={form.autor}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Año:
                    <input
                        type="number"
                        name="anio"
                        value={form.anio}
                        onChange={handleChange}
                        required
                        min="0"
                        max={new Date().getFullYear()}
                    />
                </label>

                <label>
                    Categoría:
                    <input
                        type="text"
                        name="categoria"
                        value={form.categoria}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? "Creando..." : "Crear Libro"}
                </button>
            </form>
        </div>
    );
};

export default CrearLibroPage;
