var Dagr = require('../models/Dagr');
var Document = require('../models/Document');
var Dagr_doc = require('../models/Dagr_doc');
var Parent_child = require('../models/Parent_child');
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
        size: req.body.size
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
                    if (req.params.parent_dagr_guid == 'top') {
                        res.send('success');
                    } else {
                        new Parent_child({
                            parent_dagr_guid: req.params.parent_dagr_guid,
                            child_dagr_guid: uuid1
                        }).save().then(function (user) {
                            res.send('success');
                        }).catch(function(err){
                            res.send('error in 4th query');
                        })
                    }
                }).catch(function(err){
                    console.log(err);
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
                    if (req.params.parent_dagr_guid == 'top') {
                        return res.send('success');
                    } else {
                        new Parent_child({
                            parent_dagr_guid: req.params.parent_dagr_guid,
                            child_dagr_guid: uuid1
                        }).save().then(function (user) {
                            res.send('success');
                        }).catch(function(err){
                            console.log(err);
                            res.send('error in 4th query');
                        })
                    }
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

exports.bulkUpload = function (req,res) {
    var dagr_name = req.body.name;
    var files_to_be_added = req.body.dagrs;

    //post the new category dagr and get its id
    var uuid3 = uuidV1();
    var currTime = new Date();

    new Dagr({  
        guid: uuid3,
        name: req.body.name,
        creation_time: currTime,
        last_Modified: currTime,
        author_id : req.params.author_id,
        size: -1
        // author_id: //how to get id of current user, maybe use jquery?
    }).save().then(function (user){

    new_dagr_guid = uuid3
    // console.log(files_to_be_added)
    console.log('hi2')
    for (i=0;i<files_to_be_added.length;i+=3) {
        // console.log("hi")
        // e = files_to_be_added[i]
        var currTime = new Date();
    //dont forget to save it to dagr doc as well!!!!!
    // var qb = Dagr.query();
    
    //possibly a duplicate check here
        var uuid1 = uuidV1(); 
        var uuid2 =  uuidV1();
        var name = files_to_be_added[i]
        var size = files_to_be_added[i+2]
        var path = files_to_be_added[i+1]
        new Dagr({
            guid: uuid1,
            name: name,
            creation_time: currTime,
            last_Modified: currTime,
            author_id : req.params.author_id,
            size: size
            // author_id: //how to get id of current user, maybe use jquery?
        }).save()
        .then(function(user1) {

            //probably want to redirect somewhere else
            //maybe want to send an acknowledgment it worked and then have popup
            console.log('hi3')
            console.log(files_to_be_added[i+1])
            new Document({
                    guid: uuid2,
                    filepath_url: path
                }).save().then(function(user2){
                    new Dagr_doc({
                        dagr_guid: user1.get('guid'),
                        document_guid: user2.get('guid')
                    }).save().then(function(user3){
                            // console.log('user');
                            // console.log(user.attributes);
                            new Parent_child({
                                parent_dagr_guid: new_dagr_guid,
                                child_dagr_guid: user3.get('dagr_guid')
                            }).save().then(function (user) {
                                console.log('success');
                                // res.send('success')
                            }).catch(function(err){
                                console.log(err)
                                console.log('error in 4th query');
                            })
                    }).catch(function(err){
                        console.log(err);
                        console.log('error in third query')
                    })
                }).catch(function(err){
                    console.log('error in second query')
                })
        })
        .catch(function(err) {
            //how to handle this error
            console.log(err);
            // res.send(err);
            // res.send('error');
        });
    }    
    res.send('success')
    })
}
exports.getOrphan = function(req, res) {
    var author_id = req.params.author_id;
    var subquery = Parent_child.query();
    subquery.select('parent_child.child_dagr_guid');

    var qb = Dagr.query();
    qb.where({author_id: author_id}).where('guid', 'not in', subquery)
    .whereNull('deletion_time').select().then(function(resp) {
        console.log(resp);
        res.send(resp);
    })


}

exports.getSterile = function(req, res) {
    var author_id = req.params.author_id;
    var subquery = Parent_child.query();
    subquery.select('parent_child.parent_dagr_guid');

    var qb = Dagr.query();
    qb.where({author_id: author_id}).where('guid', 'not in', subquery)
    .whereNull('deletion_time').select().then(function(resp) {
        console.log(resp);
        res.send(resp);
    })

}

exports.getTimeRange = function(req, res) {
    var author_id = req.params.author_id;
    var start = req.body.start_time;
    var end = req.body.end_time;

    var qb = Dagr.query();
    qb.where({author_id: author_id}).whereNull('deletion_time')
    .whereBetween('creation_time', [start, end]).select().then(function(resp) {
        console.log(resp);
        res.send(resp);
    })

}

exports.search = function(req, res) {
    var author_id = req.params.author_id;
    var name = req.body.name;
    var creation_time = req.body.creation_time;
    var guid = req.body.guid;
    var last_Modified = req.body.last_Modified;

    var qb = Dagr.query();
    qb.where({author_id: author_id}).whereNull('deletion_time')
    .andWhere(function() {
        this.where('guid', guid).orWhere('name', name).orWhere('creation_time', creation_time).orWhere('last_Modified',last_Modified)
    }).select().then(function(resp) {
        console.log(resp);
        res.send(resp);
    })



}
