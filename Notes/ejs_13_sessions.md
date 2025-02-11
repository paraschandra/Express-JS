## Lecture_13: Sessions

In Express.js, sessions are used to store user data across multiple requests. Unlike cookies, session data is stored server-side, while only a session ID is sent to the client.

### Installing `express-session`
Express does not handle sessions by default, so you need to install the express-session middleware.
```ls
npm install express-session
```

### Basic Usage of Sessions
**Setting Up Express Session:**
```js
const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "mySecretKey", // Secret key to sign session ID
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Save new sessions
    cookie: { maxAge: 60000 }, // Session expires in 60 seconds
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Express Sessions!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### Storing and Accessing Session Data
**Store a Value in Session:**
```js
app.get("/set-session", (req, res) => {
  req.session.username = "JohnDoe";
  res.send("Session data set!");
});
```

**Access Session Data:**
```js
app.get("/get-session", (req, res) => {
  if (req.session.username) {
    res.send(`Logged in as: ${req.session.username}`);
  } else {
    res.send("No session data found");
  }
});
```

### Destroying a Session
To log out a user or remove session data:
```js
app.get("/destroy-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error destroying session");
    }
    res.send("Session destroyed successfully");
  });
});
```

### Configuring Session Options
You can customize session behavior using options:
```js
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 300000, // 5 minutes
      httpOnly: true, // Prevents JavaScript access
      secure: false, // Set to `true` for HTTPS
      sameSite: "strict", // Protects against CSRF attacks
    },
  })
);
```

Key Options Explained:

- `secret` → Used to sign the session ID cookie.
- `resave`: false → Prevents session from being saved if not modified.
- `saveUninitialized`: false → Prevents creating sessions for unauthenticated users.
- `cookie.maxAge` → Sets session expiration time.
- `httpOnly`: true → Protects session cookie from client-side JavaScript access.

### Using Session with Authentication
Example of how sessions can be used in a login system:
```js
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if (username === "admin" && password === "password") {
    req.session.user = username;
    res.send("Login successful!");
  } else {
    res.send("Invalid credentials");
  }
});

app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user}`);
  } else {
    res.send("Unauthorized access");
  }
});
```

### Using Session Store (Database)
By default, express-session stores sessions in memory, which is not recommended for production. Use Redis, MongoDB, or MySQL for persistent session storage.

#### Using connect-mongo for MongoDB Sessions
```ls
npm install connect-mongo
```
```js
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/sessionDB" }),
    cookie: { maxAge: 60000 },
  })
);
```