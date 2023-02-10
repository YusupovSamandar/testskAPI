const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionsSchema = new Schema({
    type: String,
    question: String,
    answer: String
})

module.exports = {
    questionsSchema
}