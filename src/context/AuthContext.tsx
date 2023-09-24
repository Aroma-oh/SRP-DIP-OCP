import { ReactNode, createContext, useContext } from 'react';
import { AuthServiceInterface } from '../services/AuthService';

type AuthProviderType = {
  children: ReactNode;
  authService: AuthServiceInterface;
};

const AuthContext = createContext<AuthServiceInterface | null>(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children, authService }: AuthProviderType) {
  const signin = authService.signin.bind(authService);
  const signup = authService.signup.bind(authService);
  const logout = authService.logout.bind(authService);

  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
