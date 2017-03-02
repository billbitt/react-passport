// Load dependencies.
const express = require("express");
const bodyParser = require("body-parser");

// Define variable to hold express().
const app = express();
// Tell app to look for static files in the below directories .
app.use(express.static("./server/static/"));
app.use(express.static("./client/dist/"));
// Tell the app to parse HTTP body mesages
app.use(bodyParser.urlencoded({ extended: false}));

// Routes.
const authRoutes = require("./server/routes/auth");
app.use("/auth", authRoutes);

// Define the port. 
const PORT = process.env.PORT || 3000;

// Start the server.
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
})