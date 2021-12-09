import React, { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, signOut,createUserWithEmailAndPassword ,updateProfile ,signInWithEmailAndPassword} from "firebase/auth";
import initializeAuthentication from '../Firebase/firebase.initialization';


initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [userRole, setUserole] = useState({});
    const auth = getAuth();
    // const [dName,setDName]=useState('')
    const [isloading,setIsloading]=useState(true);

    const googleProvider = new GoogleAuthProvider();
    const joinWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const logOut = () => {
        return signOut(auth);
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                // setDName(user.displayName);
            }else{
                setUser({})
            }
            setIsloading(false);
        });
    }, [])
    
    return {
        auth,
        user,
        setUser,
        userRole,
        setUserole,
        updateProfile,
        joinWithGoogle,
        logOut,
        isloading,
        setIsloading,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword 
    }
};

export default useFirebase;