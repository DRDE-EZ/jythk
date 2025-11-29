// Helper to retrieve OAuth data from sessionStorage on the client
export function getOAuthDataFromStorage(cookieName: string): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(cookieName);
}

export function clearOAuthDataFromStorage(cookieName: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(cookieName);
}
