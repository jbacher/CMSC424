var Dagr = require('../models/User');
const uuidV1 = require('uuid/v1');

exports.postHtml = function(req, res) {
    //when we add in the UI, we should sanitize the input either here or there
    var currTime = new Date();
    new Dagr({
        guid: uuidV1(),
        name: req.body.name,
        creation_time: currTime,
        last_modified: currTime
        // author: //how to get email of current user
    }).save()
    .then(function(user) {
        //probably want to redirect somewhere else
        //maybe want to send an acknowledgment it worked and then have popup
        res.send('success');
    })
    .catch(function(err) {
        //how to handle this error
        res.send('error');
    });
}