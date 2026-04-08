import { createContext, useState, useContext } from 'react';
import { setAuthToken, clearAuthToken } from '../api/client';
// Create a context to manage authentication state across the application
const AuthContext = createContext();


// AuthProvider component provides the authentication context to its children.
// It manages the current user state and handles login/logout logic.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // The login function receives the JWT token and user profile directly from the backend response.
  // Based on the API contract, this includes the token, userId, and role.
  const login = (token, userData) => {
    // Store the token in the memory-only variable inside api/client.js to prevent XSS theft
    setAuthToken(token);

    // Save user profile (e.g., userId, role) in React state for dynamic UI rendering
    setUser(userData);
  };


  // Performs logout by clearing the memory token and resetting the user state.
  const logout = () => {
    clearAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// Custom hook to easily access the authentication context.
// Ensures that auth data is only accessible within an AuthProvider.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
