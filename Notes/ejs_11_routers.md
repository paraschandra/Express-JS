## Lecture_11: Routers

In Express.js, routers allow you to organize your routes into separate modules, making your application modular, maintainable, and scalable.

### Creating a Router
Routers are defined in separate files to keep code organized.

Create a file: 📂 `routes/userRoutes.js`
```js
const express = require("express");
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
  res.send("List of all users");
});

router.get("/:id", (req, res) => {
  res.send(`User with ID: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send("User created");
});

router.put("/:id", (req, res) => {
  res.send(`User with ID ${req.params.id} updated`);
});

router.delete("/:id", (req, res) => {
  res.send(`User with ID ${req.params.id} deleted`);
});

module.exports = router;
```
Import routes:
```js
const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON

// Import routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes); // Prefix all user routes with "/users"

app.listen(3000, () => console.log("Server running on port 3000"));
```

### Nested (Modular) Routers
You can nest routers for better organization.

📂 `routes/apiRoutes.js`
```js
const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");

router.use("/users", userRoutes);
router.use("/products", productRoutes);

module.exports = router;
```
Then use it in server.js:
```js
const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);
```

### Summary
- Routers help organize routes into separate files.
- Use express.Router() to create modular route handlers.
- Apply middleware at the router level.
- Nest routers to structure your API better.