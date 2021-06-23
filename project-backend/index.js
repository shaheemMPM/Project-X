// Importing Core Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Importing general models
const HttpError = require("./models/http-error");

// Importing utilities
// const logger = require("./utils/logger");

// import routes
const userRoutes = require("./routes/user-routes");
const classroomRoutes = require("./routes/classroom-routes");
const lectureRoutes = require("./routes/lecture-routes");
const materialRoutes = require("./routes/materials-routes");
const assignmentsRoutes = require("./routes/assignments-routes");

const app = express();

app.use(cors());

app.use(express.json());

// Public Folder
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to Project-X Server",
  });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/classroom", classroomRoutes);
app.use("/api/v1/lecture", lectureRoutes);
app.use("/api/v1/material", materialRoutes);
app.use("/api/v1/assignment", assignmentsRoutes);

app.use((req, res, next) => {
  console.error(`Could not find the route : ${req.originalUrl}`);
  throw new HttpError("Could not find this route.", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect("mongodb://localhost:27017/projectx", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(8000, () => {
      console.log("Running on port 8000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
