import express from "express";
import allRoutes from "./routes/z.index.allroutes.js";
import errorHandler from "./utils/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://applyflow-blush.vercel.app/',
// ];

// all required middlewares
app.options('*', cors({
  origin: 'https://applyflow-blush.vercel.app/',
  credentials: true,
}));

app.use(
  cors({
  origin: 'https://applyflow-blush.vercel.app/',
  credentials: true,
})
);




// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


app.get("/health",(req,res)=>{
  res.send({message:"Everthing working fine"})
})

// Routes and error handlers
app.use("/applyflow/api/v0/", allRoutes);
app.use(errorHandler);


export default app;
