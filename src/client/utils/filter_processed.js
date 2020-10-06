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

export function filterExclusiveWords(processed) {
  let result = [];
  processed.forEach(word =>{
    if (exclusivo.primero.find(exclusive => exclusive === word)) {
      result.push(word);
    }
  })
  return result;
}
