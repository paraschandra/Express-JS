## Lecture_02: GET Requests

### Routing
Routing refers to how an application’s endpoints (URIs) respond to client requests.

You define routing using methods of the Express `app` object that correspond to HTTP methods; for example, `app.get()` to handle GET requests and `app.post()` to handle POST requests.

### Define a GET Route
Use the app.get() method to define a route that handles GET requests to a specific path. It takes two arguments:

1. The path (e.g., /users)
2. A callback function that handles the request and response

`Example:`

```js
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(201).send({msg: 'Hello, Express!'});
});

app.get("/api/users", (req, res) => {
    res.send([
        {id: 1, username: 'anson', displayName: 'Anson'},
        {id: 2, username: 'john', displayName: 'John'},
        {id: 3, username: 'alvin', displayName: 'Alvin'},
    ]);
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