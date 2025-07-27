const express =require("express");
const cors=require("cors");
const app =express();
require("dotenv").config();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // ✅ no trailing slash!
    credentials: true               // optional, if you're using cookies or auth
  }));

const routes = require("./routes");
app.use("/api",routes);
const port =5000;


const connectDB = require("./connectDb");

const startServer = async () =>{
    await connectDB();
    app.listen(port,()=> {
        console.log(`Server is listening on port ${port}`)
    })
}

startServer();