const express = require("express")
const app =express()
const cors = require("cors")

// enabling cross origin access
app.use(cors)

const auth = require("./routes/authRoute")

//json transfer
app.use(express.json());

//routes
app.use("/api/v1",auth)





module.exports = app;