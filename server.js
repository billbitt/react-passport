// load dependencies
const express = require("express");

// define variable to hold express()
const app = express();
// tell app to look for static files in the below directories 
app.use(express.static("./server/static/"));
app.use(express.static("./client/dist/"));

// define the port 
const PORT = process.env.PORT || 3000;
// start the server 
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
})