const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require('dotenv').config()
mongoose.pluralize(null);

const {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    findByType
} = require("./routes/questions")

const port = process.env.PORT;
mongoose.set('strictQuery', true);
// setting Up
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept-Type"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(bodyParser.json());
app.use(cors());

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://samandar:$samandar31@questdb.ktq0bil.mongodb.net/?retryWrites=true&w=majority');
}

mongoose.connection.on("open", function () {
    console.log("Connected to mongo server.");
});

app.route("/questions")
    .get(questions)
    .post(addQuestion)
    .delete(deleteQuestion)
    .put(updateQuestion);


app.route("/questions/:type")
    .get(findByType);


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});