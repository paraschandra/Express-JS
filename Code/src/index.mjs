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

// query params
app.get("/api/users", (req, res) => {
    const {query: {filter, value},} = req;

    if(!filter && !value) return res.send(users);
    if(filter && value) return res.send(
        users.filter((user) => user[filter].includes(value))
    );
    return res.send(users);
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

// request params
app.get("/api/users/:id", (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    if(isNaN(parsedId))
        return res.status(400).send({msg: "Bad request. Invalid ID."});

    const user = users.find((usr) => usr.id === parsedId);
    if(!user) return res.sendStatus(404);
    return res.send(user);
});

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