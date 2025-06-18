export function mergeSort(arr, campo, orden = "asc") {
  if (arr.length <= 1) return arr;

  const medio = Math.floor(arr.length / 2);
  const izquierda = mergeSort(arr.slice(0, medio), campo, orden);
  const derecha = mergeSort(arr.slice(medio), campo, orden);

  return merge(izquierda, derecha, campo, orden);
}

function merge(izq, der, campo, orden) {
  const resultado = [];

  while (izq.length && der.length) {
    let valIzq = izq[0][campo];
    let valDer = der[0][campo];

    // Para strings, comparar ignorando mayúsculas/minúsculas
    if (typeof valIzq === "string" && typeof valDer === "string") {
      valIzq = valIzq.toLowerCase();
      valDer = valDer.toLowerCase();
    }

    let comparar;

    if (orden === "asc") {
      comparar = valIzq < valDer;
    } else {
      comparar = valIzq > valDer;
    }

    if (comparar) {
      resultado.push(izq.shift());
    } else {
      resultado.push(der.shift());
    }
  }

  return resultado.concat(izq, der);
}
