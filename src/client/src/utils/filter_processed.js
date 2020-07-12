const exclusivo = {
  primero: [
    "casa",
    "grupo",
    "equipo",
    "lugar",
    "México",
    "escuela",
    "familia",
    "lobo",
    "hombre",
    "hacer",
    "compañero",
    "cuaderno",
    "día",
    "libro",
    "importante",
    "maestro",
    "jugar",
    "aquí",
    "biblioteca",
    "siempre",
  ],
  segundo: [],
};

export default function getExclusiveWords(processed) {
  for (const key in processed.conflicts) {
    if (!exclusivo.primero.find((word) => word === key)) {
      delete processed.conflicts[key];
    }
  }
  for (const key in processed.ready) {
    if (!exclusivo.primero.find((word) => word === key)) {
      delete processed.ready[key];
    }
  }
  console.log(processed);
  return processed;
}
