const express = require("express");
const app= express();
// const adminRouter = require("./routes/admin")
// const userRouter = require("./routes/user")
app.use(express.json());
app.use("/admin",require("./routes/admin"));
app.use("/user",require("./routes/user"));
app.listen(3000)