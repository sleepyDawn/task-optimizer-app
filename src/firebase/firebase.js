import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// database
// database.ref("expenses").push({
//   description: "laundary bill",
//   amount: 123,
//   note: "MOnthly expenses",
//   createdAt: 23423423423,
// });
// database.ref("expenses").push({
//   description: "gas bill",
//   amount: 1213,
//   note: "MOnthly expenses",
//   createdAt: 23423423423,
// });
// database.ref("expenses").push({
//   description: "mobile bill",
//   amount: 12312,
//   note: "MOnthly expenses",
//   createdAt: 23423423423,
// });

export { firebase, googleAuthProvider, database as default };
