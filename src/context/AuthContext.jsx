import { createContext,useContext,useState,useEffect } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();
export const AuthContextProvider = ({children})=>
{
    const [session, setSession] = useState(undefined);

 //SignUp New User
  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email: email, password: password });
    if (error) {
      console.error('Error signing up |', error);
      return { success: false, error };

    }
      return { success: true, data };
  };

    // Sign In User 
    const signInUser = async (email,password) => {
        try{
            const {date, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error)
            {
                console.log("Error : Problem Sign In User | ", error );
                return { success : false, error: error.message}; 
            }
            console.log("Sign In User Success |", data);
            return {success: tree, data };
        }catch(error) {
            console.log("Error : Problem Sign In User |", error)
        }
    };

    // Sign Out 
        const signOut =()=>{
            const {error } = supabase.auth.signOut();
            if (error ) {
                console.error('Error : Problem Sign Out User |', error);
            return { success: false, error };
            }
        };


    useEffect(() => {
        supabase.auth.getSession().then(({data: { session }}) => {
            setSession(session);
        });
         supabase.auth.onAuthStateChange((_event, session) =>{
            setSession(session);
         });
    }, []);

    return(
        <AuthContext.Provider value={{ session,signInUser,signUp,signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};