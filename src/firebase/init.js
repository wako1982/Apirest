import firebase from 'firebase';
import firestore from 'firebase/firestore';
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDEtfrE7E0QpaRxzQnkg6RUplWfXUmnLTQ",
    authDomain: "logvuejs.firebaseapp.com",
    databaseURL: "https://logvuejs.firebaseio.com",
    projectId: "logvuejs",
    storageBucket: "logvuejs.appspot.com",
    messagingSenderId: "8539271948",
    appId: "1:8539271948:web:f52455ea018cd2fe77cf29"
  };
  const firebaseapp =firebase.initializeApp(firebaseConfig);
  
  export default firebaseapp.firestore();
