const express = require('express');
const router = express.Router();
const db = require('../../models')
const User = db.User
const bcrypt = require('bcryptjs');
const passport = require("passport");

router.get("/login", (req, res)=>{
    res.render("users/login", { email: "", error:[] });
})

router.get("/register", (req, res)=>{
    res.render("users/register", { name: "", email: "", error:[] });
})

router.post("/register", (req, res)=>{
    const { name, email, password, confirmPassword } = req.body
    let error = [];
    if(!name || !email || !password || !confirmPassword){
        error.push("各欄位不得為空");
    }
    if(password !== confirmPassword){
        error.push("密碼確認錯誤");
    }
    if(error.length > 0){
        return res.render("users/register", {
                    error,
                    name,
                    email
                });
    }
    User.findOne({ where: { email } }).then(user => {
      if (user) {
          error.push("此信箱已申請");
          return res.render("users/register",{
                        error,
                        name,
                        email
                    });
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => {
            req.flash("success_msg", "註冊成功，請登入");
            res.redirect('/users/login')
        })
        .catch(err => console.log(err))
    })
})

router.post('/login', function(req, res, next) {
    let email = req.body.email;
    let error = [];
    if(!req.body.email || !req.body.password){
        req.flash("error_msg", "各欄位不得為空");
        return res.redirect("/users/login");
    }
    passport.authenticate('local', (err, user, info) => {
      req.logIn(user, err => {
        if (err) {
            if(info.message === "user"){
                error.push("找不到使用者");  
            }
            if(info.message === "password"){
                error.push("密碼錯誤");
            }
            return res.render('users/login', { email, error});    
        }
        req.flash("success_msg", "登入成功，歡迎您");
        return res.redirect('/');
      });
    })(req, res, next);
}) 

router.get("/logout", (req, res)=>{
    req.logout();
    req.flash("success_msg", "登出成功");
    res.redirect("/users/login");
})



module.exports = router;