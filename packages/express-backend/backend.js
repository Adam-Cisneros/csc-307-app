import express, { json } from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
}

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
}

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const deleteUserById = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] === id);
    if (index !== -1) {
        return users["users_list"].splice(index, 1);
    } else {
        return undefined;
    }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const addUser = (user) => {
    // Makes three-digit random id
    user.id = ""+Math.floor(Math.random()*11)+Math.floor(Math.random()*11)+Math.floor(Math.random()*11);
    users["users_list"].push(user);
    return user;
}

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

app.get("/users/job", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send();
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    let new_user = addUser(userToAdd);
    res.status(201).send(new_user);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = deleteUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.status(204).send();
    }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});