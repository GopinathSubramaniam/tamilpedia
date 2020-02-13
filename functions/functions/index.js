const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const PEDIA_HINT = 'pedia_hint';

exports.searchPedias = functions.https.onRequest(async (request, response) => {
  const categorySnapShot = await db.collection(PEDIA_HINT, ref => ref.where('category', '<=', this.searchText + '\uf8ff')).get();
});
