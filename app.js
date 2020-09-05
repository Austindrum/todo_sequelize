const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require("./routes");
const app = express()
const usePassport = require("./config/passport");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  next()
})
app.use(routes);

const PORT = 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})