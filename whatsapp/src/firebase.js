import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA--A1nEooA20OewM2BpyD8USnQlgiNtqQ",
  authDomain: "whatsapp-b17fc.firebaseapp.com",
  databaseURL: "https://whatsapp-b17fc.firebaseio.com",
  projectId: "whatsapp-b17fc",
  storageBucket: "whatsapp-b17fc.appspot.com",
  messagingSenderId: "797619250219",
  appId: "1:797619250219:web:94781fec01d0df2d5c766e",
  measurementId: "G-N9Q7GTKEPW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export{provider , auth};
export default db;