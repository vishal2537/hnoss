import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
// const http = require('http');
// const socketIO = require('socket.io');
// import socketIO from "socket.io" ; 
// const { MongoClient } = require("mongodb");

import dbConnection from "./dBConfig/index.js";

// const client = new MongoClient(process.env["ATLAS_URI"]);

dotenv.config();
const PORT = process.env.PORT || 3000;
import errorMiddleware from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";

dbConnection();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// const http = require("http").createServer(express);
// const io = require("socket.io")(http);

app.use(routes);

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
