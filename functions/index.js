const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setAdminClaim = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.token.isAdmin) {
    throw new functions.https.HttpsError('permission-denied', 'Du må være admin for å sette admin-claim.');
  }

  const uid = data.uid;
  if (!uid) {
    throw new functions.https.HttpsError('invalid-argument', 'UID mangler.');
  }

  await admin.auth().setCustomUserClaims(uid, { isAdmin: true });
  return { success: true };
});
