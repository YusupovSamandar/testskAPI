"use strict";
const mongoose = require("mongoose");
// Schemas
const { studentSchema, sessionsSchema } = require("./../schemas");
// Models
const Students = mongoose.model('students', studentSchema);
const Sessions = mongoose.model('session', sessionsSchema);

exports.students = (_req, res) => {
    Students.find({}).then((result) => {
        res.send(result);
    });
};

exports.login = async (req, res) => {
    const result = await Students.findOne({ user: req.body.user, password: req.body.password });
    if (result) {
        const foundSession = await Sessions.findOne({ _id: result.sessionID });
        res.send({ status: 200, user: result, session: foundSession });
    } else {
        res.send({ status: 404, mgs: "such user does not exist" });
    }

};

exports.addStudents = async (allStudents) => {
    let ress = await Students.insertMany(allStudents);
    return ress
};
exports.deleteStudent = async (req, res) => {
    const deletingUser = await Students.findOne({ _id: req.body.id }); // should delete all students as well
    const result = await deletingUser.remove();
    res.send(result);
}