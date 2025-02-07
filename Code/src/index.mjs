import express from "express";
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json()); // middleware
app.use(cookieParser("helloworld"));
app.use(routes);

// for global use of middleware
//app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.cookie('hello', 'world', {maxAge: 10000, signed: true});
    res.status(201).send({msg: 'Hello, Express!'});
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})