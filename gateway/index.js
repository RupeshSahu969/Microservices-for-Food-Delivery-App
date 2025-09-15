const express=require("express");
const proxy = require('express-http-proxy');
const cors=require("cors");
const app=express();

app.use(cors());
app.use(express.json());

app.use("/customer", proxy("http://localhost:8001"));
app.use("/", proxy("http://localhost:8002"));
app.use("/shopping", proxy("http://localhost:8003"));

const PORT=8000;
app.listen(PORT,() => {
    console.log(`Gateway Service is running on port ${PORT}`);
});
