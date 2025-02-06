## Lecture_10: Validation

In Express.js, you can validate request data using middleware like `express-validator` or `Joi`.

`express-validator` is a set of express.js middlewares that wraps the extensive collection of validators and sanitizers offered by validator.js.

It allows you to combine them in many ways so that you can validate and sanitize your express requests, and offers tools to determine if the request is valid or not, which data was matched according to your validators, and so on.

**Installation:**
```ls
> npm install express-validator
```

**Basic Usage:**<br>
To use express-validator, import the necessary functions and define validation chains within your route handlers:
```js
const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

app.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Proceed with user registration
    res.send('User registered successfully');
  }
);

app.listen(3000, () => console.log('Server running on port 3000'));
```

In this example:

- The body function is used to declare validation chains for username, email, and password fields.

- The validationResult function collects the validation errors, if any, and returns them in the response.

**Common Validators:**<br>
- `isEmail()`: Checks if the input is a valid email address.
- `notEmpty()`: Ensures the input is not empty.
- `isLength({ min, max })`: Validates the length of the input.
- `isNumeric()`: Checks if the input contains only numeric characters.

**Common Sanitizers:**<br>
- `trim()`: Removes leading and trailing whitespaces.
- `escape()`: Replaces <, >, &, ', " with their corresponding HTML entities.
- `normalizeEmail()`: Canonicalizes an email address.

**Custom Validators:**<br>
You can define custom validators using the `custom()` method:
```js
body('username').custom(value => {
  if (value === 'admin') {
    throw new Error('Username cannot be "admin"');
  }
  return true;
});
```

**Error Handling:**<br>'
To handle validation errors, use the `validationResult` function:
```js
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
```
This function returns an object containing any validation errors, which can then be formatted and sent in the response.

### Validation Schema
In express-validator, you can define a validation schema using the `checkSchema()` function. This method allows you to structure validations in a more organized way.

The `checkSchema()` function allows you to define validation rules as an object.

Using a Separate File for Validation for better structure.

`utils/userValidator.js`
```js
const { checkSchema } = require("express-validator");

const userValidationSchema = checkSchema({
  username: {
    notEmpty: { errorMessage: "Username is required" },
    isLength: { options: { min: 3 }, errorMessage: "Username must be at least 3 characters long" },
  },
  email: {
    isEmail: { errorMessage: "Invalid email format" },
    normalizeEmail: true,
  },
  password: {
    isLength: { options: { min: 6 }, errorMessage: "Password must be at least 6 characters long" },
  },
});

module.exports = userValidationSchema;
```
Then, import it into your routes:
```js
const userValidationSchema = require("./validators/userValidator");
app.post("/register", userValidationSchema, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.send("User registered successfully");
});
```