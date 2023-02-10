"use strict";
const mongoose = require("mongoose");
// Schemas
const { questionsSchema } = require("./../schemas");
// Model
const Questions = mongoose.model('questions', questionsSchema);

exports.questions = (req, res) => {
    Questions.find({}).then((result) => {
        res.send(result);
    });
};

exports.findByType = (req, res) => {
    const questionType = req.params.type;
    Questions.find({ type: questionType }).then((result) => {
        res.send(result);
    });
}

exports.addQuestion = (req, res) => {
    const newQuestion = new Questions(req.body);
    newQuestion.save((err, newQuestionDoc) => {
        if (err) {
            res.send(err);
        } else {
            res.send(newQuestionDoc);
        };
        // saved!
    });
};
exports.deleteQuestion = (req, res) => {
    Questions.deleteOne({ _id: req.body.id }, (err) => {
        if (err) res.send(err);
        res.send("success!");
    });
}
exports.updateQuestion = (req, res) => {
    Questions.findOneAndUpdate({ _id: req.body.id }, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}