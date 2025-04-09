import dotenv from "dotenv";
// Load environment variables from.env file. You can use `dotenv.config()` to do this.
dotenv.config({
  path: "./.env",
});
import connectDB from "./configs/connectDB.js";
import app from "./app.js";


connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

/*

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, (err) => {
      if (err && err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is in use. Trying another port...`);
        app.listen(PORT + 1, () => {
          console.log(`Server running on port ${PORT + 1}`);
        });
      } else {
        console.log(`Server running on port ${PORT}`);
      }
    });
  })
  .catch((err) => {
    if (err && err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is in use. Trying another port...`);
      app.listen(PORT + 1, () => {
        console.log(`Server running on port ${PORT + 1}`);
      });
    } else {
      console.log(`Server running on port ${PORT}`);
    }
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

  */
