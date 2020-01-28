import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBs1sFwKwy7K8C0K3N-40-oELWUVuTco1k',
    authDomain: 'kellyhot-chat.firebaseapp.com',
    databaseURL: 'https://kellyhot-chat.firebaseio.com',
    projectId: 'kellyhot-chat',
    storageBucket: 'kellyhot-chat.appspot.com',
    messagingSenderId: '1026449272711',
    appId: '1:1026449272711:web:3a3c15de07c4d9184dad22',
  });
}

const auth = firebase.auth();
const database = firebase.database();

export default (context, inject) => {
  inject('fb', {
    auth,
    database,
  });
};
