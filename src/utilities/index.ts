export function capitalize(val: string) {
  return val.charAt(0).toUpperCase() + String(val).slice(1);
}
export function buildAbsolutePath(URL: string) {
  return `https://www.${URL}`;
}
