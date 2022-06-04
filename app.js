const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");

// enabling cross origin access
app.use(cors());

const auth = require("./routes/authRoute");
const post = require("./routes/postRoutes");

//json transfer
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

//routes
app.use("/api/v1", auth);
app.use("/api/v1", post);

//error middleware
app.use(errorMiddleware);

module.exports = app;
