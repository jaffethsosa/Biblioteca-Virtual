import React, { useEffect, useState } from "react";
import { obtenerLibros, devolverLibro, prestarLibro, eliminarLibro } from "../services/libroService";
import LibroCard from "../components/LibroCard";
import "./styles/LibrosPages.css";
import { mergeSort } from "../utils/sort";


const LibrosPage = () => {
    const [libros, setLibros] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [autorFiltro, setAutorFiltro] = useState("");
    const [categoriaFiltro, setCategoriaFiltro] = useState("");
    const [anioFiltro, setAnioFiltro] = useState("");
    const [ordenarPor, setOrdenarPor] = useState("titulo");
    const [campo, orden] = ordenarPor.split("-");


    const cargarLibros = async () => {
        const res = await obtenerLibros();
        setLibros(res.data);
    };

    const handleDevolver = async (id) => {
        try {
            await devolverLibro(id);
            cargarLibros();
        } catch (err) {
            alert("Error al devolver libro");
        }
    };

    const handlePrestar = async (id) => {
        try {
            await prestarLibro(id);
            cargarLibros();
        } catch (err) {
            alert("Error al prestar libro");
        }
    };

    const handleEliminar = async (id) => {
        try {
            await eliminarLibro(id);
            cargarLibros();
        } catch (err) {
            alert("Error al eliminar libro");
        }
    };

    useEffect(() => {
        cargarLibros();
    }, []);

    // Obtener valores únicos para los filtros
    const autores = [...new Set(libros.map((libro) => libro.autor))];
    const categorias = [...new Set(libros.map((libro) => libro.categoria))];
    const anios = [...new Set(libros.map((libro) => libro.anio))];

    // Filtrado
    const librosFiltrados = libros.filter((libro) =>
        libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) &&
        (autorFiltro === "" || libro.autor === autorFiltro) &&
        (categoriaFiltro === "" || libro.categoria === categoriaFiltro) &&
        (anioFiltro === "" || libro.anio === parseInt(anioFiltro))
    );

    return (
        <div className="contenedor-libros">
            <h1>📚 Lista de Libros</h1>

            <div className="filtros-container">
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="barra-busqueda"
                />

                <select value={autorFiltro} onChange={(e) => setAutorFiltro(e.target.value)}>
                    <option value="">Todos los autores</option>
                    {autores.map((autor, idx) => (
                        <option key={idx} value={autor}>{autor}</option>
                    ))}
                </select>

                <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)}>
                    <option value="">Todas las categorías</option>
                    {categorias.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))}
                </select>

                <select value={anioFiltro} onChange={(e) => setAnioFiltro(e.target.value)}>
                    <option value="">Todos los años</option>
                    {anios.sort().map((anio, idx) => (
                        <option key={idx} value={anio}>{anio}</option>
                    ))}
                </select>
            </div>
                    <p className="filtro-name">Filtrar Asc - Desc</p>
            <select className="select-ordenar" value={ordenarPor} onChange={(e) => setOrdenarPor(e.target.value)}>
                <option value="titulo-asc">Título A → Z</option>
                <option value="titulo-desc">Título Z → A</option>
                <option value="autor-asc">Autor A → Z</option>
                <option value="autor-desc">Autor Z → A</option>
                <option value="categoria-asc">CATEGORIA A → Z</option>
                <option value="categoria-desc">CATEGORIA Z → A</option>
            </select>

            <div className="grid-libros">
                {mergeSort(librosFiltrados, campo, orden).map((libro) => (
                    <LibroCard
                        key={libro.id}
                        libro={libro}
                        onPrestar={handlePrestar}
                        onDevolver={handleDevolver}
                        onEliminar={handleEliminar}
                    />
                ))}
            </div>

        </div>
    );
};

export default LibrosPage;
