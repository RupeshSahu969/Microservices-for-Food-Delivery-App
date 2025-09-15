const express=require("express");
const app=express();

app.get("/",(req,res) => {
    res.send("Customer Home Page");
})
app.use(express.json());
const PORT=8003;
app.listen(PORT,() => {
    console.log(`Shopping Service is running on port ${PORT}`);
});
