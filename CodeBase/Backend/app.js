// Import express module
require("dotenv").config();
const express = require("express");

const dbConnection = require("./Config/dbConfig");
const userRoutes = require("./routes/userRoute.routes");
const loanRoutes = require("./routes/loanRoute.routes");
const paymentRoutes = require("./routes/paymentRoute.routes");
const createTable = require("./createtable");

const { authMiddleware } = require("./Middlewares/authMiddleware");
// Create an instance of the express server
const app = express();

// Start listening on port
const port = 4300;

app.use(express.json());

const createTablePromise = new Promise((resolve, reject) => {
    createTable(resolve, reject, dbConnection);
});
// app.use("/api/createUser", createTable);
app.use("/api/user", userRoutes);
app.use("/api/loan", authMiddleware, loanRoutes);
app.use("/api/payment", authMiddleware, paymentRoutes);

app.get("/", (req, res) => {
    console.log("yes");
    res.send("Hello world");
});

async function start() {
    try {
        const result = await dbConnection.execute("select 'test' ");
        app.listen(port);
        console.log("database connection established");
        console.log(`listing on port: ${port}`);
    } catch (err) {
        console.log(err.message);
    }
}
start();
