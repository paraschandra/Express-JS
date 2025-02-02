## Lecture_04: Query Parameters

Query parameters are key-value pairs appended to the URL after a ? symbol. They allow users to send additional data in a request.

### Accessing Query Parameters
You can access query parameters using `req.query`.

**Example:**
```js
const express = require('express');
const app = express();

app.get('/search', (req, res) => {
    const keyword = req.query.q;
    res.send(`Search results for: ${keyword}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
**Request:**
```bash
http://localhost:3000/search?q=javascript
```
**Response:**
```sql
Search results for: javascript
```

### Multiple Query Parameters
```js
app.get('/filter', (req, res) => {
    const { category, price } = req.query;
    res.send(`Category: ${category}, Price: ${price}`);
});
```
**Request:**
```bash
http://localhost:3000/filter?category=laptop&price=1000
```
**Response:**
```yaml
Category: laptop, Price: 1000
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

// query params
app.get("/api/users", (req, res) => {
    const {query: {filter, value},} = req;

    if(!filter && !value) return res.send(users);
    if(filter && value) return res.send(
        users.filter((user) => user[filter].includes(value))
    );
    return res.send(users);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})
```