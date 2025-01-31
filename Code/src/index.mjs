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