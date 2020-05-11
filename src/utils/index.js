export function isObjectEmpty(obj) {
  for(var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
    }
  }
  return true;
}