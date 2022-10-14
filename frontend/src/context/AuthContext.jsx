import { useContext, createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    FacebookAuthProvider,
    RecaptchaVerifier,
} from "firebase/auth";
import { auth, db } from "../firebase";

import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
        // signInWithRedirect(auth, provider);
    };

    const facebookSignIn = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logOut = () => {
        signOut(auth);
    };

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {}
        }, auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log("User", user);
            setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                image: user.photoURL
            });
        });
        return () => {
            unsubscribe();
        };


    }, [user]);

    return ( < AuthContext.Provider value = {
            {
                googleSignIn,
                facebookSignIn,
                logOut,
                user,
                generateRecaptcha
            }
        } > { children } <
        /AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};