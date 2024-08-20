const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./dbconfigs/dbs");
const router = require("./routes/route");
const cookieparser=require("cookie-parser")
const {app,server}=require('./socket/index')
dotenv.config();

// const app = express();

app.use(express.json());
app.use(cookieparser())
app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true
}));

const port = process.env.PORT || 8080;

// API routing
app.use('/api', router);
connectDb().then(() => {
  server.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
}).catch((error) => {
  console.log("Database error", error);
});








// const app = express()
