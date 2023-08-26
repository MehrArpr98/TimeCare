import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyADCk4qz8QMKm7LplYYr9cb7Nj98asCLiE",
    authDomain: "kaaraat-1bbb2.firebaseapp.com",
    projectId: "kaaraat-1bbb2",
    storageBucket: "kaaraat-1bbb2.appspot.com",
    appId: "1:166024829390:web:60d8a063180fec243ab39f"
  };

  firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()
  const db = firebase.firestore()
  const usersCollection = db.collection('users')
  const tasksCollection = db.collection('tasks')

  export  {auth, usersCollection, tasksCollection } 