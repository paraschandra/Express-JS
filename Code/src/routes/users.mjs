import { Router } from 'express';
import { checkSchema, matchedData, query, validationResult } from 'express-validator';
import { users } from '../utils/constants.mjs';
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';
import { resolveUserByIndex } from '../utils/middlewares.mjs';

const router = Router();

router.get(
    "/api/users",
    query("filter")
		.isString()
		.notEmpty()
		.withMessage("Must not be empty")
		.isLength({ min: 3, max: 10 })
		.withMessage("Must be at least 3-10 characters"),
    (req, res) => {
        const result = validationResult(req);
        console.log(result);

        const { query: { filter, value }} = req;
        if(filter && value) return res.send(
            users.filter((user) => user[filter].includes(value))
        );
        return res.send(users);
    }
);

router.get("/api/users/:id", resolveUserByIndex, (req, res) => {
    const { userIdx } = req;
    const user = users[userIdx];
    if(!user) return res.sendStatus(404);
    return res.send(user);
});

router.post(
    "/api/users",
    checkSchema(createUserValidationSchema),
    (req, res) => {
        const result = validationResult(req);
        console.log(result);
    
        if(!result.isEmpty())
            return res.sendStatus(400).send({errors: result.array()});
    
        const data = matchedData(req);
        const newUser = {
            id: users[users.length-1].id+1,
            ...data
        };
        users.push(newUser);
        return res.status(201).send(newUser);
    }
);

router.put("/api/users/:id", resolveUserByIndex, (req, res) => {
    const { body, userIdx } = req;

    users[userIdx] = { id: users[userIdx].id, ...body };
    return res.sendStatus(200);
});

router.patch("/api/users/:id", resolveUserByIndex, (req, res) => {
	const { body, userIdx } = req;
	users[userIdx] = { ...users[userIdx], ...body };
	return res.sendStatus(200);
});

router.delete("/api/users/:id", resolveUserByIndex, (req, res) => {
	const { userIdx } = req;
	users.splice(userIdx, 1);
	return res.sendStatus(200);
});

export default router;