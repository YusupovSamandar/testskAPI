"use strict";
const mongoose = require("mongoose");
// Schemas
const { userSchema } = require("./../schemas");
// Model
const Users = mongoose.model('users', userSchema);

exports.users = (_req, res) => {
    Users.find({}).then((result) => {
        res.send(result);
    });
};

// incoming data {login: "oasidnjdfiun", password: "sdfnisd"}
exports.login = (req, res) => {
    Users.findOne({ login: req.body.login, password: req.body.password }).then((result) => {
        if (result) {
            res.send({ status: 200, user: result });
        } else {
            res.send({ status: 404, mgs: "such user does not exist" });
        }
    });
};


exports.addUser = (req, res) => {
    const newUser = new Users(req.body);
    newUser.save((err, newUserDoc) => {
        if (err) {
            res.send({ status: 400, msg: "user already exists" });
        } else {
            res.send(newUserDoc);
        };
        // saved!
    });
};
exports.deleteUser = async (req, res) => {
    const deletingUser = await Users.findOne({ _id: req.body.id });
    const result = await deletingUser.remove();
    res.send(result);
}
exports.updateUser = (req, res) => {
    Users.findOneAndUpdate({ _id: req.body.id }, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}