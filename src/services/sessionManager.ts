const SESSION_KEY = 'sentiment-analyzer-session-id';

/**
 * Retrieves the session ID from localStorage.
 * @returns {string | null} The session ID or null if not found.
 */
export const getSessionId = (): string | null => {
  return localStorage.getItem(SESSION_KEY);
};

/**
 * Saves the session ID to localStorage.
 * @param {string} sessionId The session ID to save.
 */
export const setSessionId = (sessionId: string): void => {
  localStorage.setItem(SESSION_KEY, sessionId);
};