import { createContext,useContext,useState,useEffect } from "react";
import {supabase} from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
    return (
        <AuthContext.Provider value={{ session }}>
        {children}
        </AuthContext.Provider>
    );
};
export const UserAuth = () => {
  return useContext(AuthContext);
}