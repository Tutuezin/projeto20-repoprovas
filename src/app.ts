import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routes/router";
import errorHandler from "./middlewares/errorMiddleware";

//CONFIGS
const app = express();
app.use([cors(), json()]);

app.use(router);
app.use(errorHandler);

export default app;
