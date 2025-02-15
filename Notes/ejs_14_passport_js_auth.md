## Lecture_14: Passport JS Authentication

Passport.js is a flexible authentication middleware for Node.js applications. It supports multiple authentication strategies like Local, OAuth, JWT, Google, Facebook, etc..

### Install Passport.js
Run the following command:
```ls
npm install passport passport-local express-session bcryptjs
```

### Basic Setup with Local Authentication in Express.js
Here's a step-by-step implementation using sessions and local authentication.
`server.js`
```js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const app = express();

// Dummy Users Database (Use MongoDB or a proper database in production)
const users = [];

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session Configuration
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username);
    if (!user) return done(null, false, { message: "User not found" });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });
      return done(null, user);
    });
  })
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((username, done) => {
  const user = users.find((u) => u.username === username);
  done(null, user);
});

// Routes

// Register Route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ message: "User registered successfully" });
});

// Login Route
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

// Logout Route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout error" });
    res.json({ message: "Logout successful" });
  });
});

// Protected Route (Check Authentication)
app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Testing the Authentication
Use Postman or cURL to test the API.

#### Register a User
```json
POST http://localhost:5000/register
Content-Type: application/json
{
  "username": "testuser",
  "password": "testpassword"
}
```

#### Login
```json
POST http://localhost:5000/login
Content-Type: application/json
{
  "username": "testuser",
  "password": "testpassword"
}
```

#### Check Authenticated User
```sh
GET http://localhost:5000/profile
```

#### Logout
```sh
GET http://localhost:5000/logout
```

### Summary
- **Passport.js** manages authentication.
- **Sessions** keep users logged in.
- **bcrypt.js** hashes passwords.
- **LocalStrategy** authenticates users.