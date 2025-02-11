import express from "express";
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { users } from "./utils/constants.mjs";

const app = express();

app.use(express.json()); // middleware
app.use(cookieParser("helloworld"));
app.use(session({
    secret: 'ejs-session-secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    },
}));
app.use(routes);

// for global use of middleware
//app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});

app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie('hello', 'world', {maxAge: 10000, signed: true});
    res.status(201).send({msg: 'Hello, Express!'});
});

app.post('/api/auth', (req, res) => {
    const { body: {username, password} } = req;
    const findUser = users.find((user) => user.username === username);
    if(!findUser || findUser.password !== password) 
        return res.status(404).send({msg: "BAD CREDENTIALS"});

    req.session.user = findUser;
    return res.status(200).send(findUser);
});

app.get('/api/auth/status', (req, res) => {
    req.sessionStore.get(req.sessionID, (err, session) => {
        console.log(session);
    });
    return req.session.user ? 
        res.status(200).send(req.session.user) :
        res.status(401).send({msg: "Not Authenticated"});
});

app.post('/api/cart', (req, res) => {
    if(!req.session.user) return res.sendStatus(401);
    const { body: item } = req;
    
    const { cart } = req.session;
    if(cart)
            cart.push(item);
    else
        req.session.cart = [item];

    return res.status(201).send(item);
});

app.get('/api/cart', (req, res) => {
    if(!req.session.user) return res.sendStatus(401);
    return res.send(req.session.cart ?? []);
});