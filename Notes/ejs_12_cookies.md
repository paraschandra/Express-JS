## Lecture_12: Cookies

In Express.js, cookies are used to store small pieces of data on the client’s browser. Express provides middleware to handle cookies easily.

### Installing and Using `cookie-parser`
Express does not handle cookies by default, so you need to install the cookie-parser middleware.

```ls
> npm install cookie-parser
```
**Basic usage:**
```js
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser()); // Middleware to parse cookies

app.get("/", (req, res) => {
  res.send("Welcome to Express with Cookies!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### Setting a Cookie
Use `res.cookie(name, value, options)` to set a cookie.
```js
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "JohnDoe", { maxAge: 900000, httpOnly: true });
  res.send("Cookie has been set!");
});
```

**Options:**<br>
- `maxAge`: 900000 → Cookie expires after 15 minutes.
- `httpOnly`: true → Prevents client-side JavaScript from accessing the cookie (security feature).
- `secure`: true → Ensures the cookie is only sent over HTTPS.
- `sameSite`: "strict" → Prevents cross-site request forgery (CSRF).

### Reading a Cookie
Use `req.cookies` to access cookies.
```js
app.get("/get-cookie", (req, res) => {
  const username = req.cookies.username;
  res.send(`Cookie Value: ${username}`);
});
```

### Deleting a Cookie
Use `res.clearCookie(name)` to remove a cookie.
```js
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie has been deleted!");
});
```

### Signed Cookies (Secure & Encrypted)
To make cookies more secure, you can sign them with a secret key.

#### Enable Signed Cookies
```js
app.use(cookieParser("mySecretKey")); // Secret key for signing cookies
```

#### Set a Signed Cookie
```js
app.get("/set-signed-cookie", (req, res) => {
  res.cookie("authToken", "secureValue", { signed: true, httpOnly: true });
  res.send("Signed cookie has been set!");
});
```

#### Read a Signed Cookie
Use `req.signedCookies` instead of `req.cookies`.
```js
app.get("/get-signed-cookie", (req, res) => {
  const token = req.signedCookies.authToken;
  res.send(`Signed Cookie Value: ${token}`);
});
```