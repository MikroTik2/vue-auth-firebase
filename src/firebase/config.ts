import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
     apiKey: 'AIzaSyDdwKwneszlfG2tfU0y0LxkidDTODDpCzQ',
     authDomain: 'vue-auth-4cde3.firebaseapp.com',
     projectId: 'vue-auth-4cde3',
     storageBucket: 'vue-auth-4cde3.appspot.com',
     messagingSenderId: '190247007217',
     appId: '1:190247007217:web:f8355b2c54cb7b5c394a50',
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
