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

app.post("/send-notification/pengajuan", (req, res) => {
  const { registrationToken } = req.body;

  const message = {
    notification: {
      title: "Pengajuan Proporsal telah dibuka",
      body: "Silahkan cek aplikasi dan lengkapi persyaratan",
    },
    token: registrationToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    });
});

app.post("/send-notification/hasil-verifikasi-kp", (req, res) => {
  const { registrationToken } = req.body;

  const message = {
    notification: {
      title: "Pengajuan Proporsal telah diverifikasi",
      body: "Silahkan cek aplikasi dan cek status pembaruan pengajuan anda",
    },
    token: registrationToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    });
});

app.post("/send-notification/dosen-pembimbing-kp", (req, res) => {
  const { registrationToken } = req.body;

  const message = {
    notification: {
      title: "Dosen Pembimbing anda telah diberikan",
      body: "Silahkan cek aplikasi dan cek dosen pembimbing anda",
    },
    token: registrationToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    });
});

app.post("/send-notification/sidang", (req, res) => {
  const { registrationToken } = req.body;

  const message = {
    notification: {
      title: "Pendaftaran Sidang telah dibuka",
      body: "Silahkan cek aplikasi dan lengkapi persyaratan",
    },
    token: registrationToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
