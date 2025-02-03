## Lecture_08: DELETE Request

A **DELETE request** is used to remove a resource from the server.

### Handling a DELETE Request
To handle a DELETE request, use `app.delete()`.

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

// delete request
app.delete("/api/users/:id", (req, res) => {
    const { params: {id} } = req;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const userIdx = users.findIndex((user) => user.id === parsedId);
    if(userIdx === -1) return res.sendStatus(404);

    users.splice(userIdx, 1);
    return res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})
```