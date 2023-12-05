
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT ;

app.use(bodyParser.json());

import userController from "./controller/user.controller.js";
import gameDataController from "./controller/gameData.controller.js";

app.use("/user", userController);
app.use("/gameData", gameDataController);
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});