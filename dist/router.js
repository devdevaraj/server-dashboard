"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/get").get((req, res) => {
    return res.json("This is a get api");
});
exports.default = router;
