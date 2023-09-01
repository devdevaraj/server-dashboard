import { Router, Request, Response } from "express";

const router = Router();

router.route("/get").get((req:Request, res:Response) => {
    return res.json("This is a get api");
});

export default router;