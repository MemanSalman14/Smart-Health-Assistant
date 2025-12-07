import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import fileUpload from "express-fileupload";
import cors from "cors";
import { dbConnection } from "./database/db.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import {inngest, functions} from "./inngest/index.js";
import { serve } from "inngest/express";

const app = express();

config({ path: "./config/config.env" });
dbConnection();
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/",
  })
);

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);
app.get("/", (req, res) => {
    res.send("API Working")
})

export default app;
