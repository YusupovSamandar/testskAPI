"use strict";
const mongoose = require("mongoose");
// Schemas
const { questionsSchema } = require("./../schemas");
const fs = require("fs");
// Model
const Questions = mongoose.model('questions', questionsSchema);

exports.questions = (_req, res) => {
    Questions.find({}).then((result) => {
        res.send(result);
    });
};

exports.findByType = (req, res) => {
    const questionType = req.params.type;
    const { number } = req.query;
    Questions.find({ type: questionType }).then((result) => {
        if (!number) {
            res.send(result);
        } else {
            // randomization
            let randomizedQuestions = [];
            let foundNumbers = [];
            for (let i = 0; i < number; i++) {
                let randomNum = Math.floor(Math.random() * result.length);
                while (foundNumbers.includes(randomNum)) {
                    randomNum = Math.floor(Math.random() * result.length);
                }
                randomizedQuestions.push(result[randomNum]);
                foundNumbers.push(randomNum);
            }
            res.send(randomizedQuestions);
        }

    });
}

exports.findByTypeAndTheme = (req, res) => {
    const questionType = req.params.type;
    const questionTheme = req.params.theme;
    const { number } = req.query;
    Questions.find({ type: questionType, theme: questionTheme }).then((result) => {
        if (!number) {
            res.send(result);
        } else {
            // randomization
            let randomizedQuestions = [];
            let foundNumbers = [];
            for (let i = 0; i < number; i++) {
                let randomNum = Math.floor(Math.random() * result.length);
                while (foundNumbers.includes(randomNum)) {
                    randomNum = Math.floor(Math.random() * result.length);
                }
                randomizedQuestions.push(result[randomNum]);
                foundNumbers.push(randomNum);
            }
            res.send(randomizedQuestions);
        }

    });
}

exports.addQuestion = (req, res) => {
    const newQuestion = new Questions({ ...req.body, questionImg: req.file ? req.file.path : "none" });
    newQuestion.save((err, newQuestionDoc) => {
        if (err) {
            res.send(err);
        } else {
            res.send(newQuestionDoc);
        };
        // saved!
    });
};
exports.deleteQuestion = async (req, res) => {
    const deletingQuestion = await Questions.findOne({ _id: req.body.id });
    if (deletingQuestion.questionImg != "none") {
        fs.unlink(deletingQuestion.questionImg, (err) => err);
    }
    const result = await deletingQuestion.remove();
    res.send(result);
}
exports.updateQuestion = (req, res) => {
    Questions.findOneAndUpdate({ _id: req.body.id }, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}