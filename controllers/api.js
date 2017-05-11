var Dagr = require('../models/Dagr');
var Document = require('../models/Document');
var Dagr_doc = require('../models/Dagr_doc');
var Parent_child = require('../models/Parent_child');
var scrape = require('html-metadata');
const uuidV1 = require('uuid/v1');
var request = require('request');
const cheerio = require('cheerio')

//check for duplicates :O

exports.postFile = function(req, res) {
    console.log('hi');

    //dont forget to save it to dagr doc as well!!!!!
    // var qb = Dagr.query();
    var type = req.body.type;
    console.log(req.body.path)
    //possibly a duplicate check here
    if(check_duplicates(req.body.path, req.params.author_id) === false) {
        console.log('cannot add, duplicate content');
        res.redirect('back');
        return;
    }




    var query = Document.query()
    .whereIn("filepath_url",  req.body.path)
    .select().then(function (resp) {
    if (resp.length != 0) {
        res.redirect('back')
    } else {
            if (type == 'html') {
        request(req.body.path[0], function(error, response, body){
            if (!error && response.statusCode == 200) {
               const $ = cheerio.load(body);
               name+= $('title').text();
               console.log('name')
               console.log(name);
               return addNewDagr(name, type, req, res);
            } else {
                return res.send('error')
            }
        })
     } else {
        name += req.body.name
        return addNewDagr(name, type, req, res);
    }
    }

    })
}

    //need to wait for callback

  function addNewDagr(name, type, req, res){
    console.log('called')
    var currTime = new Date();
    var uuid1 = uuidV1();
    var uuid2 =  uuidV1();

    new Dagr({
        guid: uuid1,
        name: name,
        creation_time: currTime,
        last_Modified: currTime,
        author_id : req.params.author_id,
        size: type=='file' ? req.body.size:-1
        // author_id: //how to get id of current user, maybe use jquery?
    }).save()
    .then(function(user) {
        console.log('hi4')
        console.log('saved')
        var path_var = req.body.path[0] ? req.body.path[0] : req.body.path[1]
        //probably want to redirect somewhere else
        //maybe want to send an acknowledgment it worked and then have popup
        new Document({
                guid: uuid2,
                filepath_url: path_var
            }).save().then(function(user){
                console.log('hi5')
                console.log(uuid1);
                console.log(uuid2);
                new Dagr_doc({
                    dagr_guid: uuid1,
                    document_guid: uuid2
                }).save().then(function(user){
                    if (req.params.parent_dagr_guid == 'top') {
                        res.redirect('back');
                        // return res.send('cool')
                    } else {
                        new Parent_child({
                            parent_dagr_guid: req.params.parent_dagr_guid,
                            child_dagr_guid: uuid1
                        }).save().then(function (user) {
                            res.redirect('back');
                            // return res.send('cool2')
                        }).catch(function(err){
                            console.log('temp3')
                            res.send('error in 4th query');
                        })
                    }
                }).catch(function(err){
                    console.log(err);
                    console.log("temp2")
                    res.send('error in third query')
                })

            }).catch(function(err){
                console.log(err);
                console.log('temp')
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

    if(check_duplicates(url, req.params.author_id) === true) {
        console.log('cannot add, duplicate content');
        res.send('cannot add, duplicate content');
        return;
    }

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
                res.send('wahhhh')
                // console.log('teset')
                // res.send('error in second query')
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

        // Not sure if this will work here
        /*if(check_duplicates(path, req.params.author_id) === true) {
            console.log('cannot add, duplicate content');
            res.send('cannot add, duplicate content');
            return;
        }*/


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
        res.render('user', {
            title: 'Orphan Report',
            is_single: false,
            dagr: resp[0],
            u_id : author_id,
            dagrs:resp
        })
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
        res.render('user', {
            title: 'Sterile Report',
            is_single: false,
            dagr: resp[0],
            u_id : author_id,
            dagrs:resp
        })
    })

}

//get time range is the new search

exports.getTimeRange = function(req, res) {

    console.log('test');
    console.log(req.body);

    var author_id = req.params.author_id;
    var start = req.query.start_time;
    var end = req.query.end_time;
    var name = req.query.name;
    console.log(author_id)
    console.log(start)
    console.log(end)
    console.log(name)

    var qb = Dagr.query();
    qb.where({author_id: author_id}).whereNull('deletion_time');
    if (start != '' && end != '') {

        ///
////// NEED TO CHANGE THE SCHEMA FROM TIME TO DATETIME
//////
        qb.whereBetween('creation_time', [start, end])
    }
    if (name != '')
        qb.where('name', 'like', '%'+name+'%')
    qb.select().then(function(resp) {
        console.log(resp);
        // res.send(resp);
        res.render('user', {
            dagrs: resp,
            title: 'DAGR Search',
            is_single: false,
            u_id : author_id
        })
    })

}

exports.search = function(req, res) {
    var author_id = req.params.author_id;
    var name = req.body.name;
    var start = req.body.start_time;
    var end = req.body.end_time;

    var qb = Dagr.query();
    qb.where({author_id: author_id}).whereNull('deletion_time')
    .andWhere(function() {
        this.where('guid', guid).orWhere('name', name).orWhere('creation_time', creation_time).orWhere('last_Modified',last_Modified)
    }).select().then(function(resp) {
        console.log(resp);
        res.send(resp);
    })
}

exports.delete = function(req, res) {
    var recursive = req.body.recursive;
    var guid = req.body.guid;
    var author_id = req.params.author_id;
    var currTime = new Date();
    var qb = Dagr.query();

    if(recursive === false) {
        qb.where({author_id: author_id, guid: guid}).whereNull('deletion_time')
        .update({deletion_time: currTime}).then(function(resp) {
            res.send('success');
        }).catch(function(error) {
            console.log(error);
            res.send('Error deleting individual Dagr');
        })
    }
    else {
        // add recursive part
    }
}

check_duplicates = function(doc_path, author_id) {
    var qb = Document.query();

    qb.where({author_id: author_id, filepath_url: doc_path}).select()
    .then(function(resp) {
        if(resp.length === 0) {
            console.log('Not a duplicate');
            return true;
        }
        else {
            console.log('Duplicate: '+doc_path);
            return false
        }
    })

}
