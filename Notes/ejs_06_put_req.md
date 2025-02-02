## Lecture_06: PUT Requests

A PUT request is used to update an existing resource on the server.

It replaces the entire resource and requires the full updated object to send data.

Used when replacing the entire record.

### Handling a PUT Request
To handle a PUT request, use `app.put()`. Ensure that the server can parse the request body using `express.json()` middleware.

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

// put request
app.put("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const userIdx = users.findIndex((user) => user.id === parsedId);
    if(userIdx === -1) return res.sendStatus(404);

    users[userIdx] = { id: parsedId, ...body };
    return res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})
```