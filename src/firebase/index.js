import firebase  from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyAb00BknyYAFZ9_dz_idnW4mqPLdpPxdns",
    authDomain: "chat-6f549.firebaseapp.com",
    databaseURL: "https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-6f549",
    storageBucket: "chat-6f549.appspot.com",
    messagingSenderId: "795887605233",
    appId: "1:795887605233:web:bcb9a0ffe866788634e050",
    measurementId: "G-M0257TBPH6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;