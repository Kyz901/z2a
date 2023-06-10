import express = require('express')
import { cacheRouter } from "./cache/cacheRouter";

const router = express.Router();

router.use("/redis", cacheRouter);

module.exports = router;
