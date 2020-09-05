const express = require('express');
const router = express.Router();

const db = require("../models");
const Todo = db.Todo;
const User = db.User;

const { authenticator } = require('../middleware/auth');
const todos = require("./modules/todos");
const users = require("./modules/users");
const auth = require("./modules/auth");

router.use("/auth", auth);
router.use("/users", users);
router.use("/todos", authenticator, todos);
router.get("/", authenticator, (req, res)=>{
    User.findByPk(req.user.id)
    .then(user=>{
        return Todo.findAll({
                    raw: true,
                    nest: true,
                    where: {
                        UserId: req.user.id
                    }
                })
    })
    .then(todos=>{
        let error = [];
        return res.render("index", { todos, error });
    })
    .catch(err => console.log(err))
});

module.exports = router;