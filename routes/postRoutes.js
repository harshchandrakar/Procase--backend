const express = require("express");
const {
  createPost,
  deletePost,
  likePost,
  createComment,
  deleteComment,
  getAllPost,
} = require("../controller/postController");
const multer = require("multer");
const isAuthenticated = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
const router = express.Router();

router
  .route("/upload/post")
  .post(isAuthenticated, upload.single("image"), createPost);

router.route("/upload/post").delete(isAuthenticated, deletePost);

router.route("/upload/post").get(isAuthenticated, getAllPost);

router.route("/upload/post/like").patch(isAuthenticated, likePost);

router.route("/upload/post/comment").patch(isAuthenticated, createComment);

router
  .route("/upload/post/comment/delete")
  .post(isAuthenticated, deleteComment);

module.exports = router;
