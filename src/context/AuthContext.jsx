import { createContext,useContext,useState,useEffect } from "react";
import {supabase} from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
const signUpNewUser = async (email, password) => {
  const { data, error } = supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    console.log("Error : Problem Sign Up User |", error);
    return { success: false, error: error.message };
  } 
    return { success: true };
};

const signInUser = async (email, password) => {
  try {
    const { data, error } = supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
    console.log("Error : Problem Sign In User |", error);
    return { success: false, error: error.message };
    }
    console.log("Sign In User Sucess |", data);
    return { success: true, data };
    } catch (error) {
            console.log("Error : Problem Sign In User | ", error); 
    }
  };
    const signOut = async () => {
     const { error } = supabase.auth.signOut();
     if (error) {
       console.log("Error : Problem Sign Out User |", error);
       return { success: false, error };
     }
   };



  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
    return (
        <AuthContext.Provider value={{ session,signInUser,signUpNewUser,signOut }}>
        {children}
        </AuthContext.Provider>
    );
};
export const UserAuth = () => {
  return useContext(AuthContext);
}