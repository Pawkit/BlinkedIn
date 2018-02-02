const db = require("../models");
var bcrypt = require('bcrypt-nodejs');

// Defining methods for the userController
module.exports = {
  authenticate: function(req, res) {
    const { username, password } = req.body;
    db.User
      .findOne({ username })
      .then(user => {
        if (!user) {
          res.json({success: false, message: 'No such user.' });
          return;
        }
        user.comparePassword(password, function(err, isMatch) {
          if (isMatch) {
            res.json({success: true, message: 'Successfully logged in.', id: user._id });
          } else {
            res.json({success: false, message: 'Wrong password.'});
          }
        });
      })
      .catch(err => res.status(422).json(err));
  },
  register: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json({id: dbModel._id}))
      .catch(err => res.status(422).json(err));
  }
};
