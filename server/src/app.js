import express from "express";
import allRoutes from "./routes/z.index.allroutes.js";
import errorHandler from "./utils/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// all required middlewares
app.options('*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(
  cors({
  origin: 'http://localhost:5173',
  credentials: true,
})
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// Routes and error handlers
app.use("/applyflow/api/v0/", allRoutes);
app.use(errorHandler);


export default app;
