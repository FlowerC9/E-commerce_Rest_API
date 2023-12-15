import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connection.js";
import authRouter from "./routes/authRoutes.js";
import buyerRouter from './routes/buyerRoutes.js'
const app = express();
dotenv.config();
connectDb();
app.use(express.json());
const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/auth", authRouter);

app.use('/api/buyer',buyerRouter);
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
