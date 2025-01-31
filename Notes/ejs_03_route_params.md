## Lecture_03: Route Params

Route parameters in Express.js are used to capture dynamic values from the URL. They allow us to define routes that can handle multiple values dynamically.

**Syntax**<br/>
Route parameters are defined using a colon (:) before the parameter name.
```js
const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

`Example:`
```js
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const users = [
    {id: 1, username: 'anson', displayName: 'Anson'},
    {id: 2, username: 'john', displayName: 'John'},
    {id: 3, username: 'alvin', displayName: 'Alvin'},
];

app.get("/", (req, res) => {
    res.status(201).send({msg: 'Hello, Express!'});
});

app.get("/api/users", (req, res) => {
    res.send(users);
});

// route params
app.get("/api/users/:id", (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    if(isNaN(parsedId))
        return res.status(400).send({msg: "Bad request. Invalid ID."});

    const user = users.find((usr) => usr.id === parsedId);
    if(!user) return res.sendStatus(404);
    return res.send(user);
});

app.get("/api/products", (req, res) => {
    res.send([
        {id: 1, product: 'soap'},
        {id: 2, product: 'milk'},
        {id: 3, product: 'perfume'},
    ]);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})
```

### Accessing Multiple Route Params
You can access route parameters using req.params.
```js
app.get('/user/:id/book/:bookId', (req, res) => {
    const { id, bookId } = req.params;
    res.send(`User ID: ${id}, Book ID: ${bookId}`);
});
```