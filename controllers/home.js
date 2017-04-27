/**
 * GET /
 */
var User = require('../models/User');

exports.index = function(req, res) {
  var qb = User.query();
  // var users = [];
  //consider adding a timeout
  qb.select().then(function(resp){
    console.log(resp);
    if (resp.length > 0) {
        return res.render('home', {
          title: 'Home',
          users: resp
        });
    }
  })
  //below should be in a catch block or else statement
  // res.render('home', {
  //   title: 'Home',
  //   users: []
  // });
};
