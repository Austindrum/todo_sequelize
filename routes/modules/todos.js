const express = require('express');
const router = express.Router();

const db = require("../../models");
const User = db.User;
const Todo = db.Todo;

router.get("/new", (req, res)=>{
    let error = []
    return res.render('todos/new', { error });
});

router.get("/:id/edit", (req, res)=>{
    let UserId = req.user.id;
    let id = req.params.id;
    let error = [];
    return Todo.findOne({
                where: { id, UserId  }
            })
            .then(todo=> res.render("todos/edit", { todo: todo.toJSON(), error }))
            .catch(err=>console.log(err))
})

router.put("/:id", (req, res)=>{
    let UserId = req.user.id;
    let id = req.params.id;
    let { title, isImportant, comment } = req.body;
    return Todo.findOne({
        where: { id, UserId  }
    })
    .then(todo=> {
        Object.assign(todo, {
            title,
            isImportant: isImportant === "on" ? true : false,
            comment,
            UserId
        })
        return todo.save();
    })
    .then(()=>{
        req.flash("success_msg", "編輯成功");
        res.redirect('/');
    })
    .catch(err=>console.log(err))
})

router.put("/:id/set_status", (req, res)=>{
    let UserId = req.user.id;
    let id = req.params.id;
    return Todo.findOne({ where: { id, UserId } })
            .then(todo => {
                todo.isDone = !todo.isDone;
                todo.save();
                return res.json({message: "success"})
            })  
})

router.post("/", (req, res)=>{
    const UserId = req.user.id;
    let { title, isImportant, comment } = req.body;
    return Todo.create({
                title,
                isImportant: isImportant === "on" ? true : false,
                comment,
                UserId
            })
            .then(()=>{
                req.flash("success_msg", "建立成功");
                res.redirect("/");
            })
            .catch(err=>console.log(err))
})

router.delete("/:id", (req, res)=>{
    let UserId = req.user.id;
    let id = req.params.id;
    return Todo.findOne({ where: {
                id, UserId
            }})
            .then(todo=> todo.destroy() )
            .then(()=> {
                req.flash("success_msg", "刪除成功");
                res.redirect("/");
            })
            .catch(err=> console.log(err))
})

module.exports = router;