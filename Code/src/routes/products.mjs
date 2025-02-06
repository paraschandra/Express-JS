import { Router } from 'express';

const router = Router();

router.get("/api/products", (req, res) => {
    res.send([
        {id: 1, product: 'soap'},
        {id: 2, product: 'milk'},
        {id: 3, product: 'perfume'},
    ]);
});


export default router;