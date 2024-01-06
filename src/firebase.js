import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvVm8e-rPkHTVM-fSAVgWSY0haeQ9vWqY",
    authDomain: "netflix-clone-a288e.firebaseapp.com",
    projectId: "netflix-clone-a288e",
    storageBucket: "netflix-clone-a288e.appspot.com",
    messagingSenderId: "275073933451",
    appId: "1:275073933451:web:415241224d8268b4ca748e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;

