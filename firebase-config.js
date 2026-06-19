// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyCeC8-ZrmsBNG4qx-hydqekrrqA29wTz0A",
  authDomain: "lostandfoundpro-9a14d.firebaseapp.com",
  projectId: "lostandfoundpro-9a14d",
  storageBucket: "lostandfoundpro-9a14d.firebasestorage.app",
  messagingSenderId: "401878871280",
  appId: "1:401878871280:web:41dc64b460079664d4e635"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
console.log("✅ Firebase شغال");