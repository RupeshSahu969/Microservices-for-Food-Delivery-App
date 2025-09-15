const express=require("express");
const app=express();

app.get("/",(req,res) => {
    res.send("product Home Page");
})
app.use(express.json());
const PORT=8002;
app.listen(PORT,() => {
    console.log(`product Service is running on port ${PORT}`);
});
