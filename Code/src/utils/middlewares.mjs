import { users } from "./constants.mjs";

export const resolveUserByIndex = (req, res, next) => {
    const { params: { id } } = req;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const userIdx = users.findIndex((user) => user.id === parsedId);
    if(userIdx === -1) return res.sendStatus(404);

    req.userIdx = userIdx;
    next();
};