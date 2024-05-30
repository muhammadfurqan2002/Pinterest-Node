var express = require('express');

var router = express.Router();
var { User } = require('../models/user')
const passport=require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(User.authenticate()));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});


router.get('/profile',isLogIn, (req, res) => {
  res.render('profile')
});

router.get('/feed',(req,res)=>{
    res.render('feed');
});

router.get('/login', (req, res) => {
  console.log(req.flash('error'));
  res.render("login",{error:req.flash('error')})
});


router.post("/register", (req, res) => {
  const { username, fullname, email } = req.body;
  let user = new User({
    username,
    fullname,
    email
  });

  User.register(user, req.body.password).then((registeredUser) => {
    passport.authenticate('local')(req, res, () => {
      res.redirect('/profile');
    });
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash:true
}), (req, res) => { });


router.get('/logout', (req, res ,next) => {
  req.logout(function (error) {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  })
});

function isLogIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

module.exports = router;
