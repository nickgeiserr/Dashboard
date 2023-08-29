const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

exports.onApplicationAccepted = functions.firestore
  .document('applications/{applicationId}')
  .onUpdate((change, context) => {
    const updatedData = change.after.data();
    const previousData = change.before.data();

    if (updatedData.wasAccepted === true && previousData.wasAccepted !== true) {
      // console.log('Application was accepted:', context.params.applicationId);
    }

    return null;
});
