import firebase from 'firebase';


// var firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyA4gsoP-3D1dz7eLU0aMTeYyRi0gtresWE",
//     authDomain: "todo-app-a077d.firebaseapp.com",
//     projectId: "todo-app-a077d",
//     storageBucket: "todo-app-a077d.appspot.com",
//     messagingSenderId: "594048254147",
//     appId: "1:594048254147:web:2acf6ec75c9dc21b29a276",
//     measurementId: "G-BP8HW0DW5P"
// });

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBE5AxYyMYDIGgO6Eq1Kgp_lfKyO0iAwTs",
    authDomain: "todo-7ee96.firebaseapp.com",
    projectId: "todo-7ee96",
    storageBucket: "todo-7ee96.appspot.com",
    messagingSenderId: "259877172414",
    appId: "1:259877172414:web:b9b321755c2aab19031aef",
    measurementId: "G-WX2BDL3ZRB"
  });
  
// Initialize Firebase

//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

const db = firebaseApp.firestore();
export  {db};