import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDi3rmJghf_bNNG72GPctS95eXveE02Q48",
  authDomain: "netflix-clone-758c7.firebaseapp.com",
  projectId: "netflix-clone-758c7",
  storageBucket: "netflix-clone-758c7.firebasestorage.app",
  messagingSenderId: "912542220170",
  appId: "1:912542220170:web:18fd8f2e5da015b9901273"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword( auth, email, password );
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split("-").join(" "));
    }
}


const login = async (email, password )=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split("-").join(" "));
    }
}


const logout = async () => {
    try {
        await signOut(auth);
        toast.error(error.code.split('/')[1].split("-").join(" "));
    } catch (error) {
        console.error("Logout error:", error);
        toast.error(error.code.split('/')[1].split("-").join(" "));
    }
}



export {auth, db, login, signup, logout};