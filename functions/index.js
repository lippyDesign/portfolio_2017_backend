const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./service_account.json');
const send_contact_email = require('./send_contact_email');
const { databaseURL } = require('./keys');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL
});

exports.send_contact_email = functions.https.onRequest(send_contact_email);