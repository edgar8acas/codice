export default [
  {
    title: "Id",
    name: "textId",
    sortField: "textId",
  },
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
    title: "Estado",
    name: "status",
    sortField: "status",
    callback: "formatStatus",
  },
  {
    title: "Contenido",
    name: "rawContent",
    sortField: "rawContent",
    callback: "formatRawContent",
  },
  "__slot:actions",
];
