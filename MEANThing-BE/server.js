import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

// Import model
import Issue from "./models/issue";

const app = express();
const router = express.Router();

const port = process.env.PORT || 4000;

// Use CORS middleware to avoid connection issues since our Database will be hosted on another server

app.use(cors());

app.options("*", cors());

// Call the json method of the body-parser middleware to convert data to JSON
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use("/", router);

// Connecting to the MongoDB Database

const mongodb =
  "mongodb+srv://benedict:rocket18@cluster0-8azdb.mongodb.net/issues?retryWrites=true&w=majority";

mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });

const connection = mongoose.connection;

// Listen for the 'open' event to tell us once there is a connection established with the database
connection.once("open", () => {
  console.log("Connection to the DB successful");
});

// Defining the Endpoints

app.get("/", (req, res) => res.send("Welcome to the Issues Tracker API Page!"));

// Endpoint to get all the issues
router.route("/issues").get((req, res) => {
  Issue.find((err, issues) => {
    if (err) {
      console.log(err);
    } else {
      res.json(issues);
    }
  });
});

// Endpoint to get a particular issue by using its ID
router.route("/issues/:id").get((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err) {
      console.log(err);
    } else {
      res.json(issue);
    }
  });
});

// Endpoint to create a new issue on the server
router.route("/issues/add").post((req, res) => {
  let issue = new Issue(req.body);
  issue
    .save()
    .then(issue => {
      res.status(200).json({ issue: "Added successfully" });
    })
    .catch(err => {
      res.status(400).send("Failed to create new issue");
    });
});

// Endpoint to update an issue
router.route("/issues/update/:id").put((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (!issue) return next(new Error("Could not load document"));
    else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

      issue
        .save()
        .then(issue => {
          res.json("Update done");
        })
        .catch(err => {
          res.status(400).send("Update failed");
        });
    }
  });
});

// Endpoint to delete an issue
router.route("/issues/delete/:id").delete((req, res) => {
  Issue.findByIdAndRemove({ _id: req.params.id }, (err, issue) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Issue deleted");
    }
  });
});

app.listen(4000, () => console.log("Server running on port 4000"));
