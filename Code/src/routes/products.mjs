import { Router } from 'express';

const router = Router();

router.get("/api/products", (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies);
    if(req.signedCookies.hello && req.signedCookies.hello === 'world')
        res.send([
            {id: 1, product: 'soap'},
            {id: 2, product: 'milk'},
            {id: 3, product: 'perfume'},
        ]);
    return res.send({msg: "Sorry, you need the right cookie."});
});


export default router;