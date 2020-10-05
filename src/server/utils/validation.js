//TODO: Assign string errors to variables
//TODO: Validate addedBy
export function validateText(text) {
  const fields = [
    ['title', 'título'], ['grade', 'grado'], 
    ['category', 'categoría'], ['rawContent', 'contenido'], 
    ['addedBy', 'añadido_por']
  ];

  fields.forEach((field) => {
    if(!Object.prototype.hasOwnProperty.call(text, field[0])) {
      throw Error('Falta el campo ' + field[1]);
    }
  })

  if(text.title.length === 0 || text.title.length > 100) {
    throw Error('El título no puede estar vacío o contener más de 100 caracteres');
  }

  text.grade = Number(text.grade);
  if (!text.grade && !(text.grade >= 1) && !(text.grade <= 6)) {
    throw Error('El grado debe ser un número entre 1 y 6');
  }

  if(text.category.length === 0 || text.category.length > 50) {
    throw Error('La categoría no puede estar vacía o contener más de 50 caracteres');
  }

  if(text.rawContent.length === 0 || text.rawContent.length > 3500) {
    throw Error('El contenido no puede estar vacío o contener más de 3500 caracteres');
  }

  return text;
}