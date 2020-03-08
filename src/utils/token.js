const NOTE_APP_KEY = 'note-app-token';

export function setToken(token) {
  localStorage.setItem(NOTE_APP_KEY, token);
}

export function getToken() {
  return localStorage.getItem(NOTE_APP_KEY)
}