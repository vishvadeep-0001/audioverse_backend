import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cors from "cors";

config({
  path: "./config/config.env",
});

const app = express();

// Middlewares
app.use(express.json());
app.use(cors())
app.use(
  express.urlencoded({
    extended: true,
  })
);

// importing routes
import product from "./routes/productRoute.js";
import user from "./routes/userRoutes.js";

app.use("/api/v1", product);
app.use("/api/v1", user);

app.use(ErrorMiddleware);

export default app;
