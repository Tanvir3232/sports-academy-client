import { createContext, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth,  signInWithEmailAndPassword,  signInWithPopup,  updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const signUp = (email,password)=>{
      setLoading(true);
      return createUserWithEmailAndPassword(auth,email,password);
    }
    const signIn = (email,password)=>{
      setLoading(true);
      return signInWithEmailAndPassword(auth,email,password);
    }
    const signInWithGoogle = ()=>{
      setLoading(true);
      return signInWithPopup(auth,googleProvider);
    }
    const saveProfile = (name,photo)=>{
      setLoading(true);
      return updateProfile(auth.currentUser, {
          displayName: name, photoURL: photo
        });
  }
    const authInfo={
        user,loading,signUp,saveProfile,signIn,signInWithGoogle
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