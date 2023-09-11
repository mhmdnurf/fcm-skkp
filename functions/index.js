/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// const admin = require("firebase-admin");
// const runtimeOpts = {
//   timeoutSeconds: 60,
//   memory: "256MB",
//   maxInstances: 3,
//   minInstances: 0,
//   availableMemoryMb: 512,
//   region: "asia-southeast2",
// };

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest(
    {
      minInstances: 0,
      maxInstances: 3,
      region: "asia-southeast2",
      memory: "256MiB",
      timeoutSeconds: 60,
    },
    (request, response) => {
      logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Firebase!");
    },
);

exports.zakaIcha = onRequest(
    {
      minInstances: 0,
      maxInstances: 3,
      region: "asia-southeast2",
      memory: "256MiB",
      timeoutSeconds: 60,
    },
    (request, response) => {
      logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Zaka!");
    },
);


// exports.sendNotificationPengajuanTutup = onRequest(
//     async (req, res) => {
//       logger.info("Notifikasi Pengajuan Tutup", {structuredData: true});
//       try {
//         const usersCollectionRef = admin.firestore().collection("users");
//         const usersSnapshot = await usersCollectionRef
//             .where("registrationToken", "!=", null)
//             .get();

//         const registrationTokens = usersSnapshot.docs.map(
//             (doc) => doc.data().registrationToken,
//         );

//         const messages = registrationTokens.map((registrationToken) => ({
//           notification: {
//             title: "Pengajuan Proposal telah ditutup",
//             body: "Semoga pengajuan kamu disetujui oleh prodi 😊",
//           },
//           token: registrationToken,
//         }));

//         const response = await admin.messaging().sendAll(messages);
//         console.log("Successfully sent notifications:", response);
//         res.status(200).json({message: "Notifications sent successfully"});
//       } catch (error) {
//         console.error("Error sending notifications:", error);
//         res.status(500).json({error: "Failed to send notifications"});
//       }
//     },
// );

// exports.sendNotificationPengajuan = onRequest(async (req, res) => {
//   logger.info("Notifikasi Pengajuan Tutup", {structuredData: true});
//   try {
//     const usersCollectionRef = admin.firestore().collection("users");
//     const usersSnapshot = await usersCollectionRef
//         .where("registrationToken", "!=", null)
//         .get();

//     const registrationTokens = usersSnapshot.docs.map(
//         (doc) => doc.data().registrationToken,
//     );

//     const messages = registrationTokens.map((registrationToken) => ({
//       notification: {
//         title: "Pengajuan Proposal telah dibuka",
//         body: "Silahkan cek aplikasi dan lengkapi persyaratan",
//       },
//       token: registrationToken,
//     }));

//     const response = await admin.messaging().sendAll(messages);
//     console.log("Successfully sent notifications:", response);
//     res.status(200).json({message: "Notifications sent successfully"});
//   } catch (error) {
//     console.error("Error sending notifications:", error);
//     res.status(500).json({error: "Failed to send notifications"});
//   }
// },
// runtimeOpts,
// );
