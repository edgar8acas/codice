export default [
  {
    title: "Título",
    name: "title",
    sortField: "title",
  },
  {
    title: "Categoría",
    name: "category",
    sortField: "category",
  },
  {
    title: "Grado",
    name: "grade",
    sortField: "grade",
    callback: "formatGrade",
  },
  {
    title: "Contenido",
    name: "rawContent",
    sortField: "rawContent",
    callback: "formatRawContent",
  },
  "__slot:actions",
];
