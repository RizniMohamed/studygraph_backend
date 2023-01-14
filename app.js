const express = require("express");
const app = express();

//import 
require('express-async-errors');
require("dotenv/config");
require("./model/dbConfig");
require("./model/user");

// import middlewares
const cors = require("cors");
const { errorHandler } = require('./middleware/errorHandler');
const notFound = require("./middleware/notfound");

//import routes
const user = require("./router/user");
const tag = require("./router/tag");
const timesheet = require("./router/timesheet");
const dashboard = require("./router/dashboard");

// Middleware
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/login", user);
app.use("/api/v1/tag", tag);
app.use("/api/v1/timesheet", timesheet);
app.use("/api/v1/dashboard", dashboard);

app.use(notFound); // handle invalid routes
app.use(errorHandler) // handle errors


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node Server Running in ${port}`));
