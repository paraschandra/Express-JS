import express from "express";
import routes from './routes/index.mjs';

const app = express();

app.use(express.json()); // middleware
app.use(routes);

// for global use of middleware
//app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(201).send({msg: 'Hello, Express!'});
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})