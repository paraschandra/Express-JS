## Lecture_05: POST Requests

A **POST request** is used to send data from the client to the server, typically for creating or updating resources.

### Handling a POST Request
To handle a POST request, use `app.post()`. You need middleware to parse the request body.
```js
import express from "express";

const app = express();

app.use(express.json()); // middleware

const PORT = process.env.PORT || 3000;

const users = [
    {id: 1, username: 'anson', displayName: 'Anson'},
    {id: 2, username: 'john', displayName: 'John'},
    {id: 3, username: 'alvin', displayName: 'Alvin'},
];

app.get("/", (req, res) => {
    res.status(201).send({msg: 'Hello, Express!'});
});

// post req
app.post("/api/users", (req, res) => {
    const {body} = req;
    const newUser = {
        id: users[users.length-1].id+1,
        ...body
    };
    users.push(newUser);
    return res.status(201).send(newUser);
})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})
```