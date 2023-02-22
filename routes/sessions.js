"use strict";
const mongoose = require("mongoose");
// Schemas
const { sessionsSchema } = require("./../schemas");
const { addStudents } = require("./students")
// Model
const Sessions = mongoose.model('session', sessionsSchema);

exports.sessions = (_req, res) => {
    Sessions.find({}).then((result) => {
        res.send(result);
    });
};

exports.addSession = async (req, res) => {
    let { students, ...rest } = req.body
    const newUser = new Sessions(rest);
    const newSession = await newUser.save();
    if (students) {
        students = students.map((e) => {
            return { ...e, sessionID: newSession._id }
        })
        const output = await addStudents(students);
        res.send(output);
    } else {
        res.send(newSession);
    }
};
exports.deleteSession = async (req, res) => {
    const deletingUser = await Sessions.findOne({ _id: req.body.id }); // should delete all students as well
    const result = await deletingUser.remove();
    res.send(result);
}
exports.updateSession = (req, res) => {
    Sessions.findOneAndUpdate({ _id: req.body.id }, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}