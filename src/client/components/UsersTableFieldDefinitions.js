export default [
  {
    title: "Id",
    name: "userId",
    sortField: "userId",
  },
  {
    title: "Usuario",
    name: "username",
    sortField: "username",
  },
  {
    title: "Rol",
    name: "admin",
    sortField: "admin",
    callback: "formatRole",
  },
  "__slot:actions",
];
