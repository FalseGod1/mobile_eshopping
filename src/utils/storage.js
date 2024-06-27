export function setItem(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

export function getItem(name) {
  return JSON.parse(localStorage.getItem(name) || '[]');
}