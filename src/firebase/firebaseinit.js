import firebase from "firebase/app";
import "firebase/firestore";
var firebaseConfig = {
    apiKey: "AIzaSyCU7qgxZ6IYJfoyAYnHTbR8WLIywSn6Vjo",
    authDomain: "weatherapptd.firebaseapp.com",
    projectId: "weatherapptd",
    storageBucket: "weatherapptd.appspot.com",
    messagingSenderId: "898186997221",
    appId: "1:898186997221:web:0dcc2be91ad6050b47d30c"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;