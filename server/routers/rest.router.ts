import { Router } from "express";

import { executer } from "../controllers/bash.controller";

const router = Router();

router.route("/get").get(executer);

export default router;