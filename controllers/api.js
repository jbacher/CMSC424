var Dagr = require('../models/Dagr');
const uuidV1 = require('uuid/v1');

exports.postHtml = function(req, res) {
    console.log('hi')
    //when we add in the UI, we should sanitize the input either here or there
    var currTime = new Date();
    //dont forget to save it to dagr doc as well!!!!!
    // var qb = Dagr.query();

    new Dagr({
        guid: 'hi',
        name: req.body.name,
        creation_time: currTime,
        last_Modified: currTime,
        author_id : req.params.author_id,
        size: 10
        // author_id: //how to get id of current user, maybe use jquery?
    }).save()
    .then(function(user) {
        //probably want to redirect somewhere else
        //maybe want to send an acknowledgment it worked and then have popup
        res.send('success');
    })
    .catch(function(err) {
        //how to handle this error
        console.log(err);
        res.send(err);
        // res.send('error');
    });
}

// exports.getTopLevel = function