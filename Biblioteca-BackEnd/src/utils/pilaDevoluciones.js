class PilaDevoluciones {
    constructor() {
        this.pila = [];
    }

    // Añadir un elemento a la pila
    push(libro) {
        if (this.pila.length >= this.maxSize) {
      this.pila.shift(); // Elimina el más antiguo
    }
    this.pila.push(libro);
  }

    // Eliminar el último elemento de la pila
    pop() {
        return this.pila.pop();
    }

    // Obtener el último elemento de la pila sin eliminarlo
    peek() {
        return this.pila[this.pila.length - 1];
    }

    // Comprobar si la pila está vacía
    isEmpty() {
        return this.pila.length === 0;
    }

    // Obtener todos los elementos de la pila
    getAll() {
        return this.pila.slice().reverse();
    }
}

module.exports = PilaDevoluciones;