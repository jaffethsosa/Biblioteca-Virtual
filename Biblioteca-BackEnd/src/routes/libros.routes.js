const express = require('express');
const router = express.Router();
const pool = require('../db');
const PilaDevoluciones = require('../utils/pilaDevoluciones');
const pilaDevoluciones = new PilaDevoluciones();

//agregar un libro
router.post('/', async (req, res) => {
  const { titulo, autor, anio, categoria } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO libros (titulo, autor, anio, categoria)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [titulo, autor, anio, categoria]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al insertar libro:', err);
    res.status(500).json({ error: 'Error al agregar libro' });
  }
});

//Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM libros');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener libros:', err);
    res.status(500).json({ error: 'Error al obtener libros' });
  }
});


router.put('/:id/devolver', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query('SELECT * FROM libros WHERE id = $1', [id]);
    const libro = result.rows[0];

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    if (libro.disponible) {
      return res.status(400).json({ mensaje: 'El libro ya está disponible' });
    }

    const resultadoActualizado = await pool.query(
      'UPDATE libros SET disponible = true WHERE id = $1 RETURNING *',
      [id]
    );

    const libroDevuelto = resultadoActualizado.rows[0];

pilaDevoluciones.push({
  ...libroDevuelto,
  fechaDevolucion: new Date().toISOString()
});


    res.json({ mensaje: 'Libro devuelto', libro: resultadoActualizado.rows[0] });

  } catch (error) {
    console.error('Error en devolución:', error.message, error.stack);
    res.status(500).json({ error: 'Error al devolver libro' });
  }
});

// Prestar un libro
router.put('/:id/prestar', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query('SELECT * FROM libros WHERE id = $1', [id]);
    const libro = result.rows[0];

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    if (!libro.disponible) {
      return res.status(400).json({ mensaje: 'El libro ya está prestado' });
    }

    const updateResult = await pool.query(
      `UPDATE libros SET disponible = false WHERE id = $1 RETURNING *`,
      [id]
    );

    res.json({ mensaje: 'Libro prestado', libro: updateResult.rows[0] });
  } catch (error) {
    console.error('Error al prestar libro:', error);
    res.status(500).json({ error: 'Error al prestar libro' });
  }
});

// Ver historial de devoluciones
router.get('/devoluciones', (req, res) => {
  const historial = pilaDevoluciones.getAll();
  res.json(historial);
});

//Obtener un libro por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM libros WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener libro:', err);
    res.status(500).json({ error: 'Error al obtener libro' });
  }
});



//Actualizar un libro por ID
router.put('/:id', async (req, res) => {   
  const { id } = req.params;
  const { titulo, autor, anio, categoria, disponible } = req.body;

  try {
    const result = await pool.query(
      `UPDATE libros
       SET titulo = $1, autor = $2, anio = $3, categoria = $4, disponible = $5
       WHERE id = $6
       RETURNING *`,
      [titulo, autor, anio, categoria, disponible, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar libro:', err);
    res.status(500).json({ error: 'Error al actualizar libro' });
  }
});



//Eliminar un libro por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM libros WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(200).json({ message: 'Libro eliminado correctamente', libro: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar libro:', err);
    res.status(500).json({ error: 'Error al eliminar libro' });
  }
}
);



module.exports = router;
