export function mergeSort(arr, campo) {
  if (arr.length <= 1) return arr;

  const medio = Math.floor(arr.length / 2);
  const izquierda = mergeSort(arr.slice(0, medio), campo);
  const derecha = mergeSort(arr.slice(medio), campo);

  return merge(izquierda, derecha, campo);
}

function merge(izq, der, campo) {
  const resultado = [];

  while (izq.length && der.length) {
    if (izq[0][campo] < der[0][campo]) {
      resultado.push(izq.shift());
    } else {
      resultado.push(der.shift());
    }
  }

  return resultado.concat(izq, der);
}
