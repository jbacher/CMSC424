var Dagr = require('../models/Dagr');
var Document = require('../models/Document');
var Dagr_doc = require('../models/Dagr_doc');
var scrape = require('html-metadata');
const uuidV1 = require('uuid/v1');

exports.postFile = function(req, res) {
    console.log('hi');
    //when we add in the UI, we should sanitize the input either here or there
    //need to see how to 'upload' file
    //don't forget about the filepath as well
    var currTime = new Date();
    //dont forget to save it to dagr doc as well!!!!!
    // var qb = Dagr.query();

    //possibly a duplicate check here
    var uuid1 = uuidV1(); 
    var uuid2 =  uuidV1();
    new Dagr({
        guid: uuid1,
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
        new Document({
                guid: uuid2,
                filepath_url: req.body.path
            }).save().then(function(user){
                new Dagr_doc({
                    dagr_guid: uuid1,
                    document_guid: uuid2
                }).save().then(function(user){
                    res.send('success')
                }).catch(function(err){
                    res.send('error in third query')
                })
            }).catch(function(err){
                res.send('error in second query')
            })
    })
    .catch(function(err) {
        //how to handle this error
        console.log(err);
        res.send(err);
        // res.send('error');
    });
}


exports.postHtml = function(req, res) {
    //maybe do some regex parsing
    //especially for images
    var url = req.body.url;
    console.log(url)
    scrape(url, function(error, metadata){
        if (error) {
            console.log(error);
            res.send('error')
        }
        var currTime = new Date();
        var uuid1 = uuidV1(); 
        var uuid2 = uuidV1();
        new Dagr({
            guid: uuid1,
            name: metadata['general']['title'],
            creation_time: currTime,
            last_Modified: currTime,
            author_id : req.params.author_id
        }).save()
        .then(function(user) {
            new Document({
                guid: uuid2,
                filepath_url: url
            }).save().then(function(user){
                new Dagr_doc({
                    dagr_guid: uuid1,
                    document_guid: uuid2
                }).save().then(function(user){
                    res.send('success')
                }).catch(function(err){
                    res.send('error in third query')
                })
            }).catch(function(err){
                res.send('error in second query')
            })
            //probably want to redirect somewhere else
            //maybe want to send an acknowledgment it worked and then have popup
        })
        .catch(function(err) {
            //how to handle this error
            console.log(err);
            res.send(err);
            // res.send('error');
        });
    });
}

exports.postCategory = function (req,res) {

}

//the below api endpoints post DAGRs that are children of other Dagrs
//so need to update the parent child table

exports.postHtmlChild = function(req,res) {

}

exports.postFileChild = function(req,res) {

}

exports.postCategoryChild = function(req,res) {
    
}