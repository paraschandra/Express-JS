## Lecture_01: Introduction & Setup

### What is Express.js?
Express is the most popular Node.js web framework, and is the underlying library for a number of other popular Node.js frameworks. It provides mechanisms to:

- Write handlers for requests with different HTTP verbs at different URL paths (routes).
- Integrate with "view" rendering engines in order to generate responses by inserting data into templates.
- Set common web application settings like the port to use for connecting, and the location of templates that are used for rendering the response.
- Add additional request processing "middleware" at any point within the request handling pipeline.

<small>Source: [mdn_web_docs]('https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Introduction')</small>

### Setting up
Generate a package.json file using:
```ls
> npm init -y
```
Install express js:
```ls
> npm i express
```
Install nodemon as dev dependency (optional):
```ls
> npm i -D nodemon
```
Create scripts:
```json
{
  "name": "code",
  "version": "1.0.0",
  "main": "index.mjs",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:dev": "nodemon ./src/index.mjs", //
    "start": "node ./src/index.mjs" //
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.21.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  },
  "type": "module" // to use es modules
}
```
`./src/index.mjs`
```js
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});
```