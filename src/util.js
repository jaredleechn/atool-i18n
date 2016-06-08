export function arrayToObject(arr, key) {
  return arr.reduce((collection, current) => ({
    ...collection,
    [current[key]]: {
      ...current,
    },
  }), {});
}
