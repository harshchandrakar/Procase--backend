const { postSchema } = require("../models/postModel");
const { User } = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const { v4: uuidv4 } = require("uuid");

exports.createPost = catchAsyncError(async (req, res) => {
  let post = await postSchema.create({
    ...req.body,
    image: req.file.path,
  });

  res
    .status(200)
    .json({ success: true, message: "Post created successfully", post: post });
});

exports.deletePost = catchAsyncError(async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(404).json({ success: true, message: "Provide post Id" });
  }
  let post = await postSchema.find({ _id: id });
  if (!post) {
    return res.status(404).json({ success: true, message: "Invalid Post Id" });
  }
  console.log("after post");
  await postSchema.deleteOne({ _id: id });

  return res
    .status(200)
    .json({ success: true, message: "Post Deleted SuccessFully", post: post });
});

exports.likePost = catchAsyncError(async (req, res) => {
  let Id = req.body.id;

  if (!Id) {
    return res.status(404).json({ success: true, message: "Provide post Id" });
  }

  await postSchema.findOneAndUpdate({ _id: Id }, { $inc: { likeCount: 1 } });
  return res.status(200).json({ success: true, message: "liked post" });
});

exports.createComment = catchAsyncError(async (req, res) => {
  const { email, comment, postId } = req.body;
  if (!email || !comment || !postId) {
    return res.status(404).json({ success: true, message: "Field missing" });
  }
  const user = await User.findOne({ email });
  const newComment = {
    _id: uuidv4(),
    user: user.name,
    avatar: user.avatar,
    comment: comment,
    postId: postId,
  };
  await postSchema.findByIdAndUpdate(postId, {
    $push: { comments: newComment },
  });
  return res.status(200).json({ success: true, message: "New comment added" });
});

exports.deleteComment = catchAsyncError(async (req, res) => {
  const { postId, id } = req.body;

  if (!postId || !id) {
    return res.status(404).json({ success: true, message: "Field missing" });
  }
  await postSchema.findOneAndUpdate(
    { _id: postId },
    { $pull: { comments: { _id: id } } }
  );

  res.status(200).json({ success: true, message: "Comment deleted" });
});

exports.getAllPost = catchAsyncError(async (req, res) => {
  let posts = await postSchema.find();
  console.log(posts);
  return res
    .status(200)
    .json({ success: true, message: "all posts", posts: posts });
});
