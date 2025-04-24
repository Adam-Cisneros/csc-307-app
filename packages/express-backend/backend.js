import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();

mongoose.set("debug", true);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING) // connect to Db "users"
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userService.getUsers(name, job)
        .then((users) => res.send(users))
        .catch((err) => {
            console.log(err);
            res.send();
        });
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    userService.findUserById(id)
        .then((user) => res.send(user))
        .catch((err) => {
            console.log(err);
            res.status(404).send("Resource not found.");
        })
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userService.addUser(userToAdd)
        .then((user) => res.status(201).send(user))
        .catch((err) => {
            console.log(err);
            res.send();
        });
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    userService.deleteUserById(id)
        .then(() => res.status(204).send())
        .catch((err) => {
            console.log(err);
            res.status(404).send("Resource not found.");
        });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});