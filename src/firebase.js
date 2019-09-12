import * as firebase from 'firebase/app';
import 'firebase/firestore';

import config from './config';

firebase.initializeApp(config);

export default firebase;