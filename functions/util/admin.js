const admin = require('firebase-admin')

admin.initializeApp();
// var serviceAccount = require("../../digital-lit-richclarke0-firebase-adminsdk-act6p-0791d9c27c.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const db = admin.firestore();


module.exports = { admin, db }
