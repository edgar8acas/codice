export function extractIds(items, modelName) {
  return items.map(item => item[modelName + 'Id'])
}