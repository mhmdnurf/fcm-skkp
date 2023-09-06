const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json"); // Ganti dengan path yang sesuai

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/test"),
  async (req, res) => {
    console.log("halo");
    res.status(200).json({ message: "Test sent successfully" });
  };

app.post("/send-notification/pengajuanTutup", async (req, res) => {
  try {
    const usersCollectionRef = admin.firestore().collection("users");
    const usersSnapshot = await usersCollectionRef
      .where("registrationToken", "!=", null)
      .get();

    const registrationTokens = usersSnapshot.docs.map(
      (doc) => doc.data().registrationToken
    );

    const messages = registrationTokens.map((registrationToken) => ({
      notification: {
        title: "Pengajuan Proposal telah ditutup",
        body: "Semoga pengajuan kamu disetujui oleh prodi 😊",
      },
      token: registrationToken,
    }));

    const response = await admin.messaging().sendAll(messages);
    console.log("Successfully sent notifications:", response);
    res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});

app.post("/send-notification/pengajuanSkripsi", async (req, res) => {
  try {
    const usersCollectionRef = admin.firestore().collection("users");
    const usersSnapshot = await usersCollectionRef
      .where("registrationToken", "!=", null)
      .get();

    const registrationTokens = usersSnapshot.docs.map(
      (doc) => doc.data().registrationToken
    );

    const messages = registrationTokens.map((registrationToken) => ({
      notification: {
        title: "Pengajuan Proposal Skripsi telah dibuka",
        body: "Silahkan cek aplikasi dan lengkapi persyaratan",
      },
      token: registrationToken,
    }));

    const response = await admin.messaging().sendAll(messages);
    console.log("Successfully sent notifications:", response);
    res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});
app.post("/send-notification/pengajuanKP", async (req, res) => {
  try {
    const usersCollectionRef = admin.firestore().collection("users");
    const usersSnapshot = await usersCollectionRef
      .where("registrationToken", "!=", null)
      .get();

    const registrationTokens = usersSnapshot.docs.map(
      (doc) => doc.data().registrationToken
    );

    const messages = registrationTokens.map((registrationToken) => ({
      notification: {
        title: "Pengajuan Proposal KP telah dibuka",
        body: "Silahkan cek aplikasi dan lengkapi persyaratan",
      },
      token: registrationToken,
    }));

    const response = await admin.messaging().sendAll(messages);
    console.log("Successfully sent notifications:", response);
    res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});
app.post("/send-notification/pengajuan", async (req, res) => {
  try {
    const usersCollectionRef = admin.firestore().collection("users");
    const usersSnapshot = await usersCollectionRef
      .where("registrationToken", "!=", null)
      .get();

    const registrationTokens = usersSnapshot.docs.map(
      (doc) => doc.data().registrationToken
    );

    const messages = registrationTokens.map((registrationToken) => ({
      notification: {
        title: "Pengajuan Proposal telah dibuka",
        body: "Silahkan cek aplikasi dan lengkapi persyaratan",
      },
      token: registrationToken,
    }));

    const response = await admin.messaging().sendAll(messages);
    console.log("Successfully sent notifications:", response);
    res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});

app.post("/send-notification/sidang", async (req, res) => {
  try {
    const usersCollectionRef = admin.firestore().collection("users");
    const usersSnapshot = await usersCollectionRef
      .where("registrationToken", "!=", null)
      .get();

    const registrationTokens = usersSnapshot.docs.map(
      (doc) => doc.data().registrationToken
    );

    const messages = registrationTokens.map((registrationToken) => ({
      notification: {
        title: "Pendaftaran Sidang telah dibuka",
        body: "Silahkan cek aplikasi dan lengkapi persyaratan",
      },
      token: registrationToken,
    }));

    const response = await admin.messaging().sendAll(messages);
    console.log("Successfully sent notifications:", response);
    res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});

app.post("/send-notification/sidangTutup", async (req, res) => {
  try {
    const usersCollectionRef = admin.firestore().collection("users");
    const usersSnapshot = await usersCollectionRef
      .where("registrationToken", "!=", null)
      .get();

    const registrationTokens = usersSnapshot.docs.map(
      (doc) => doc.data().registrationToken
    );

    const messages = registrationTokens.map((registrationToken) => ({
      notification: {
        title: "Pendaftaran Sidang telah ditutup",
        body: "Selamat menempuh sidang dan semoga berhasil 😊",
      },
      token: registrationToken,
    }));

    const response = await admin.messaging().sendAll(messages);
    console.log("Successfully sent notifications:", response);
    res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});

app.post(
  "/send-notification/hasil-verifikasi-kp-berhasil/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Selamat Pengajuan Kerja Praktek kamu telah disahkan! 😊",
          body: "Dosen pembimbing kamu akan segera ditentukan",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/hasil-verifikasi-kp-ditolak/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Maaf Pengajuan Kerja Praktek kamu ditolak! 😢",
          body: "Silahkan cek catatan dan segera lakukan perbaikan",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/dosen-pembimbing-kp/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Dosen Pembimbing Kerja Praktek telah diberikan",
          body: "Silahkan cek aplikasi dan cek dosen pembimbing anda",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/hasil-verifikasi-skripsi-berhasil/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Selamat, pengajuan skripsi kamu telah disahkan! 😁",
          body: "Dosen pembimbing kamu akan segera ditentukan",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/hasil-verifikasi-skripsi-ditolak/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Maaf, pengajuan skripsi kamu telah ditolak! 😢",
          body: "Periksa catatan kamu dan segera lakukan perbaikan",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/dosen-pembimbing-skripsi/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Dosen Pembimbing Skripsi telah diberikan",
          body: "Silahkan cek aplikasi dan cek dosen pembimbing anda",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/hasil-verifikasi-sidang-kp-berhasil/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Pendaftaran Sidang Kerja Praktek telah disahkan!😁",
          body: "Selamat menempuh sidang dan semoga berhasil",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);
app.post(
  "/send-notification/hasil-verifikasi-sidang-kp-ditolak/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Pendaftaran Sidang Kerja Praktek telah ditolak!😢",
          body: "Periksa catatan kamu dan segera lakukan perbaikan",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/hasil-verifikasi-sempro-berhasil/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Selamat, Seminar Proposal kamu telah disahkan! 😁",
          body: "Selamat menempuh sidang dan semoga berhasil",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/hasil-verifikasi-sempro-ditolak/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Maaf, Seminar Proposal kamu telah ditolak! 😢",
          body: "Periksa catatan kamu dan segera lakukan perbaikan",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/hasil-verifikasi-kompre-berhasil/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Selamat, pendaftaran Kompre kamu telah disahkan! 😁",
          body: "Selamat menempuh sidang dan semoga berhasil",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/hasil-verifikasi-kompre-ditolak/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Maaf, pendaftaran Kompre kamu telah ditolak! 😢",
          body: "Periksa catatan kamu dan segera lakukan perbaikan",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/hasil-verifikasi-sidang-skripsi-berhasil/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Selamat, Sidang Skripsi telah disahkan! 😁",
          body: "Selamat menempuh sidang dan semoga berhasil",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.post(
  "/send-notification/hasil-verifikasi-sidang-skripsi-ditolak/:user_uid",
  async (req, res) => {
    try {
      const userUid = req.params.user_uid;

      const userRef = admin.firestore().collection("users").doc(userUid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const registrationToken = userDoc.data().registrationToken;

      const message = {
        notification: {
          title: "Maaf, Sidang Skripsi telah ditolak! 😢",
          body: "Periksa catatan kamu dan segera lakukan perbaikan",
        },
        token: registrationToken,
      };

      const response = await admin.messaging().send(message);
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
