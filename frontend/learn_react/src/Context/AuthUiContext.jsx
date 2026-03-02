// AuthUiContext.jsx
import { createContext, useContext, useState } from "react";
import AuthModal from "../Composantes/AuthModal";

const AuthUiContext = createContext();

export function AuthUiProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openAuth = () => setOpen(true);
  const closeAuth = () => setOpen(false);

  return (
    <AuthUiContext.Provider value={{ openAuth, closeAuth }}>
      {children}
      {open && <AuthModal close={closeAuth} />}
    </AuthUiContext.Provider>
  );
}

export function useAuthUi() {
  return useContext(AuthUiContext);
}