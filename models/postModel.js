const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
  },
  hosted: {
    type: String,
    default: null,
  },
  github: {
    type: String,
    default: null,
  },
  dribble: {
    type: String,
    default: null,
  },
  reddit: {
    type: String,
    default: null,
  },
  twitter: {
    type: String,
    default: null,
  },
  insta: {
    type: String,
    default: null,
  },
  facebook: {
    type: String,
    default: null,
  },
  hosted: {
    type: String,
    default: null,
  },
  behance: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
  comments: [
    {
      _id: String,
      user: String,
      avatar: String,
      comment: String,
      postId: String,
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
});

exports.postSchema = mongoose.model("PostSchema", postSchema);
