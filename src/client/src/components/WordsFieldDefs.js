export default [
  {
    title: "Id",
    name: "wordId",
    sortField: "wordId",
  },
  {
    title: "Palabra",
    name: "word",
    sortField: "word",
  },
  {
    title: "Definición",
    name: "definition",
    sortField: "definition",
  },
  {
    title: "Tipo",
    name: "type",
    sortField: "type",
  },
  {
    title: "Imagen",
    name: "imageUrl",
    callback: "formatUrl",
    sortField: "imageUrl"
  },
  {
    title: "Video",
    name: "videoUrl",
    callback: "formatUrl",
    sortField: "videoUrl"
  },
  "__slot:actions",
];
