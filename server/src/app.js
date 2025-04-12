import dotenv from "dotenv";
// Load environment variables from.env file. You can use `dotenv.config()` to do this.
dotenv.config({
  path: "./.env",
});
import express from "express";
import allRoutes from "./routes/z.index.allroutes.js";
import errorHandler from "./utils/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";



const app = express();

const allowedOrigins = [process.env.CORS_ORIGIN1, process.env.CORS_ORIGIN2];
console.log(allowedOrigins, "allowedOrigin");
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow no-origin requests (e.g., Postman or mobile)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false, // allow loading images/videos/fonts from other domains
    contentSecurityPolicy:
      process.env.NODE_ENV === "production"
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'", process.env.CORS_ORIGIN2], // allow frontend scripts
              connectSrc: ["'self'", process.env.CORS_ORIGIN2], // allow API requests
              imgSrc: ["'self'", "data:", "blob:", process.env.CORS_ORIGIN2], // allow images
              styleSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://fonts.googleapis.com",
              ],
              fontSrc: ["'self'", "https://fonts.gstatic.com"],
            },
          }
        : false, // Disable in dev to prevent annoying CSP blocks
    hidePoweredBy: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.send({ message: "Everthing working fine" });
});

// Routes and error handlers
app.use("/applyflow/api/v0/", allRoutes);
app.use(errorHandler);

export default app;
