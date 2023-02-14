const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionsSchema = new Schema({
    type: String,
    question: String,
    answer: String,
    questionImg: String,
    theme: String
});

const userSchema = new Schema({
    login: { type: String, unique: true },
    password: String
});

module.exports = {
    questionsSchema,
    userSchema
}