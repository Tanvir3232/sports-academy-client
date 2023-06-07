import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth,  updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const signUp = (email,password)=>{
      setLoading(true);
      return createUserWithEmailAndPassword(auth,email,password);
    }
    const saveProfile = (name,photo)=>{
      setLoading(true);
      return updateProfile(auth.currentUser, {
          displayName: name, photoURL: photo
        });
  }
    const authInfo={
        user,loading,signUp,saveProfile
    }
    return (
       <AuthContext.Provider value={authInfo}>
         {
           children
         }
       </AuthContext.Provider>
    );
};

export default AuthProvider;