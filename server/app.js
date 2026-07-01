import express from "express";
import cors from "cors";

import healthRoutes from "./routes/healthRoutes.js";
import notFound from "./middleware/notFoundMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/health", healthRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;