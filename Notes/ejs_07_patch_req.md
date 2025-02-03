## Lecture_07: PATCH Request

A **PATCH request** is used to **partially update** an existing resource, meaning only the specified fields are updated, while the rest remain unchanged.

### Handling a PATCH request
To handle a PATCH request, use `app.patch()`. Ensure the request body is parsed using `express.json()` middleware.

**Example:**
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

// patch request
app.patch("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const userIdx = users.findIndex((user) => user.id === parsedId);
    if(userIdx === -1) return res.sendStatus(404);

    users[userIdx] = {...users[userIdx], ...body};
    return res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})
```