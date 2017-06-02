const User = require('../models/user.js');
const passport = require('passport');
var bcrypt = require('bcrypt');

let passportLocal = (username, password, next) => {
  User.findOne({username: username}, (err, user) => {
    if (err) {return next(err);}
    if (!user) { return next(null,{message:'The username and password you entered did not match our records. Please check and try again.'} ); }
    if (!bcrypt.compareSync(password, user.password)) {return next(null, {message:'The username and password you entered did not match our records. Please check and try again.'}); }
    return next(null, user);
  });
}
module.exports = passportLocal;