const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

/*
    Here comes whatever restful api we create with the mongoDB
*/

app.listen(PORT, () => console.log("Server started on port 8080"));
