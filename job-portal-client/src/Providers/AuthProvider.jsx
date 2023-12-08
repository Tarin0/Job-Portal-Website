import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";


const auth = getAuth(app);
export const AuthContext = createContext();
const provider = new GoogleAuthProvider;
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    //google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth,provider );
    }


    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    // useEffect(() => {
    //     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    //     //   console.log("user in the auth state changed", currentUser);
        
    //     const loggedUser = {email: currentUser.email};
          
    //     setUser(currentUser);
    //       setLoading(false);
    //       if(currentUser)
    //       {
    //         axios.post('https://job-portal-server-lemon.vercel.app/jwt',loggedUser,{withCredentials: true})
    //         .then(res =>{
    //             console.log('token response',res.data)
    //         })
    //       }
    //       else
    //       {
    //         axios.post('https://job-portal-server-lemon.vercel.app/logout',loggedUser,{withCredentials: true})
    //         .then(res =>{
    //             console.log(res.data)
    //         })
    //       }

    //     });
    //     return () => {
    //       return unSubscribe();
    //     };
    //   }, []);


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        //   console.log("user in the auth state changed", currentUser);
          setUser(currentUser);
          setLoading(false);
          const loggedUser = {email: currentUser.email};
          if(currentUser)
          {
            axios.post('https://job-portal-server-lemon.vercel.app/jwt',loggedUser,{withCredentials: true})
            .then(res =>{
                console.log('token response',res.data)
            })
          }

          else
          {
            axios.post('https://job-portal-server-lemon.vercel.app/logout',loggedUser,{withCredentials: true})
            .then(res =>{
                console.log(res.data)
            })
          }

        });
        return () => {
          return unSubscribe();
        };
      }, []);

    const userInfo = {
        user,
        loading,
        createUser,
        signin,
        googleLogin,
        logOut
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;