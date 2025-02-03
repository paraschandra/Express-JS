## Lecture_09: Middleware

Middleware functions are functions that have access to the request object (`req`), response object (`res`), and the `next` middleware function in the request-response cycle. They can execute code, modify the request/response, end the request-response cycle, or call the next middleware.

### Middleware Flow
1. Execute middleware
2. Call `next()` or send a response
3. Repeat until response is sent

### Types of Middleware
1. Application-level Middleware
2. Router-level Middleware
3. Built-in Middleware
4. Third-party Middleware
5. Error-handling Middleware

#### 1. Application level Middleware
Defined at the app level and executed for every incoming request.
```js
const express = require('express');
const app = express();

// Application-level middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Proceed to the next middleware or route handler
});

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

#### 2. Router-level Middleware
Similar to application-level, but applied to specific routers.
```js
const express = require('express');
const app = express();
const router = express.Router();

// Router-level middleware
router.use((req, res, next) => {
    console.log(`Router Middleware: ${req.url}`);
    next();
});

router.get('/user', (req, res) => {
    res.send('User Page');
});

app.use(router);

app.listen(3000, () => console.log('Server running on port 3000'));
```

#### 3. Built-in Middleware
Express provides built-in middleware like `express.json()` and `express.urlencoded()`.
```js
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
```

#### 4. Third-party Middleware
Installed via npm, e.g., `morgan` for logging or `cors` for enabling CORS.
```js
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev')); // Logs requests to the console
app.use(cors()); // Enables CORS
```

#### 5. Error-handling Middleware
Handles errors in the application. Requires four parameters: `err`, `req`, `res`, `next`.
```js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
```

### Executing Middleware for Specific Routes
```js
app.get('/about', (req, res, next) => {
    console.log('Middleware for /about');
    next(); // Continue to route handler
}, (req, res) => {
    res.send('About Page');
});
```

### Common Use Cases
1. **Logging requests**: `morgan`
2. **Serving static files**: `express.static`
3. **Parsing JSON and form data**: `express.json`, `express.urlencoded`
4. **Authentication**: Custom or third-party (like `passport.js`)
5. **Handling errors**: Custom error-handling middleware