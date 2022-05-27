const express = require("express")
const app =express()
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error");
const cors = require("cors")

// enabling cross origin access
app.use(cors)

const auth = require("./routes/authRoute")

//json transfer
app.use(express.json());
app.use(cookieParser())

//routes
app.use("/api/v1",auth)

//error middleware
app.use(errorMiddleware);



module.exports = app;