import { config } from 'dotenv';
import firebaseAdmin from 'firebase-admin';
import firebaseStoreAuthentication from '@baseurl/googlecloud.json';

config();

const firebaseAdminInstance = firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(firebaseStoreAuthentication as object),
	storageBucket: process.env.STORAGE_BUCKET
});

const firebaseBucket = firebaseAdmin.storage().bucket();

export { firebaseBucket,firebaseAdminInstance };