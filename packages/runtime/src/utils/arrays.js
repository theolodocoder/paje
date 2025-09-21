/**
 * Filter null values from an array
 * @param {Array} arr - An array of values
 * @returns {Array} Array of non null values
 */
export function withoutNulls(arr) {
  return arr.filter((item) => item != null);
}
