const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const multer = require("multer");
require('dotenv').config()
mongoose.pluralize(null);

// Routes

const {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    findByType,
    findByTypeAndTheme
} = require("./routes/questions");
const {
    users,
    addUser,
    deleteUser,
    updateUser,
    login
} = require("./routes/users");
const {
    sessions,
    addSession,
    deleteSession,
    updateSession
} = require("./routes/sessions");

const {
    login: studentLogin,
    deleteStudent,
    students
} = require("./routes/students")


// setting Up Configuration

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

// ENV FILES

const port = process.env.PORT;
const user = process.env.USER;
const password = process.env.PASSWORD

mongoose.set('strictQuery', true);

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
    await mongoose.connect(`mongodb+srv://${user}:${password}@questdb.ktq0bil.mongodb.net/?retryWrites=true&w=majority`);
}

mongoose.connection.on("open", function () {
    console.log("Connected to mongo server.");
});

app.route("/questions")
    .get(questions)
    .post(upload.single("questionImg"), addQuestion)
    .delete(deleteQuestion)
    .put(updateQuestion);

app.route("/sessions")
    .get(sessions)
    .post(addSession)
    .delete(deleteSession)
    .put(updateSession);

app.route("/students")
    .get(students)
    .post(studentLogin)
    .delete(deleteStudent);

app.route("/questions/:type")
    .get(findByType);


app.route("/questions/:type/:theme")
    .get(findByTypeAndTheme);

// handle Users
app.route("/users")
    .get(users)
    .post(addUser)
    .delete(deleteUser)
    .put(updateUser);


app.route("/user/login")
    .post(login);


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});