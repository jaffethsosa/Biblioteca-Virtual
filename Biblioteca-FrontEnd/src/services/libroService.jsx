import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerLibros = () => axios.get(API_URL);
export const devolverLibro = (id) => axios.put(`${API_URL}/${id}/devolver`);
export const verDevoluciones = () => axios.get(`${API_URL}/devoluciones`);
export const prestarLibro = (id) => axios.put(`${API_URL}/${id}/prestar`);
export const eliminarLibro = (id) => axios.delete(`${API_URL}/${id}`);
