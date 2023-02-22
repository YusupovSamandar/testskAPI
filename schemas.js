const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionsSchema = new Schema({
    type: String,
    question: String,
    answer: String,
    questionImg: String,
    theme: String
});

const studentSchema = new Schema({
    user: String,
    password: String,
    sessionID: String
});

const sessionsSchema = new Schema({
    manager: String,
    subject: String,
    theme: String,
    numberOfQuestions: Number,
    givenTime: String
});

const userSchema = new Schema({
    login: { type: String, unique: true },
    password: String
});

module.exports = {
    questionsSchema,
    userSchema,
    studentSchema,
    sessionsSchema
}