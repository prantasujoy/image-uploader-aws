// app.js
const express = require("express");
const jsonParser = express.json();
const cors = require("cors");
const multer = require("multer");

require("dotenv").config();

const { UploadToS3, getPresignedUrl } = require("./s3Uploader");
const verifyJWT = require("./middleware/verityJWT");

const app = express();
const port = process.env.PORT || 4000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.post("/images", verifyJWT, upload.single("image"), async (req, res) => {
  const { file } = req;
  const user_id = req.headers["user_id"];
  const upload_folder = req.headers["upload-folder"];

  if (!file && !user_id) {
    res.status(500).json({ message: "bad request" });
  }
  const { error, key } = await UploadToS3({ upload_folder, user_id, file });

  if (error) {
    res.status(500).json({ message: error });
  }
  res.json({ key });
});

app.get("/images", verifyJWT, async (req, res) => {
  const user_id = req.headers["user_id"];

  if (!user_id) return res.status(400).json({ message: "Bad request" });

  const { error, presignedUrls } = await getPresignedUrl(user_id);

  if (error) return res.status(400).json({ message: error.message });

  return res.json({ presignedUrls });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
