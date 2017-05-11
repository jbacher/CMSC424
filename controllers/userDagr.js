var User = require('../models/User');
var Dagr = require('../models/Dagr');
var Parent_child = require('../models/Parent_child');
var Dagr_doc = require('../models/Dagr_doc')


//TODO remember not return deleted ones

exports.getAll = function(req, res) {
    var user_id = req.params.user_id;
    var subquery = Dagr.query()
    // subquery.join('parent_child', 'guid', 'parent_child.parent_dagr_guid')
    .whereNull('dagr.deletion_time')
    .select()

    // var qb = Dagr.query();

    .then(function(resp) {
        console.log(resp);
        res.render('user', {
            title: 'My MMDA',
            dagrs: resp,
            u_id : user_id
            // guid : 
        })
        //above is temporary
    })

    //this should only do top-level queries
    //ones that have no parent
};


//WE ARE GOING TO HARD CODE 5 ITERATIONS
exports.reach = function(req, res){
    console.log('test')
    var user_id = req.params.user_id;

    //DONT FORGET TO RETURN THE CURRENT DAGR
    if (!req.params.dagr_guid || req.params.dagr_guid == 'top') {
        //return all dagrs with current user as the author

        //WE ARE GOING TO HARD CODE 5 ITERATIONS
        var subquery = Dagr.query()
        .where({author_id: user_id})
        .whereNull('dagr.deletion_time')
        .select()
        .then(function(resp){
                res.render('user', {
                    u_id : user_id,
                    dagrs: resp,
                    title: 'Reach Query',
                    guid: req.params.guide != 'top' ? req.params.dagr_guid : null
                })
        })
    } else {
        final_dagrs = [req.params.dagr_guid];
        var guid = req.params.dagr_guid;
        var temp_dagrs = [req.params.dagr_guid];
        console.log('guid')
        console.log(guid)
        // while(temp_dagrs.length > 0) {
            // console.log('hi')
            // temp2_dagrs = temp_dagrs;
            //make sure this is not a reference copy otherwise it won't work
            // temp_dagrs = []
        var x = true;
            var subquery = Parent_child.query()
            .whereIn('parent_dagr_guid', temp_dagrs)
            .select('child_dagr_guid').then(function(resp){
                console.log('resp')
                resp.forEach(function(e){
                    temp_dagrs.push(e.child_dagr_guid)
                    final_dagrs.push(e.child_dagr_guid)
                })
                if (resp.length == 0) {
                    res.send(final_dagrs)
                    return;
                } else {
                    var subquery2 = Parent_child.query()
                    .whereIn('parent_dagr_guid', temp_dagrs)
                    .select('child_dagr_guid').then(function(res2){
                        console.log('resp2')
                        resp2.forEach(function(e){
                            temp_dagrs.push(e.child_dagr_guid)
                            final_dagrs.push(e.child_dagr_guid)
                        })
                      if (res2.length == 0) {
                          res.send(final_dagrs)
                          return;
                      } else {
                          var subquery3 = Parent_child.query()
                          .whereIn('parent_dagr_guid', temp_dagrs)
                          .select('child_dagr_guid').then(function(res3){
                            console.log('resp3')
                            resp3.forEach(function(e){
                                temp_dagrs.push(e.child_dagr_guid)
                                final_dagrs.push(e.child_dagr_guid)
                            })
                            res.send(final_dagrs);
                      })
                      }
                    })
                }
            })
        console.log('temp')
        res.send(final_dagrs)
        //
    }
}

exports.getMMDA = function(req, res){
    var user_id = req.params.user_id;
    //this is the range query
    var subquery = Dagr.query();
    subquery.join('parent_child', 'guid', 'parent_child.child_dagr_guid')
    .select('dagr.guid');

    var qb = Dagr.query();
    qb.where({author_id: user_id}).where('guid', 'not in', subquery).whereNull('deletion_time').select().then(function(resp){
        res.render('user', {
            dagrs: resp,
            title: 'My MMDA',
            u_id : user_id
        })
    })

    // return res.render('user', {
//
    // })
};

/*
 * You have the option to recursively delete child Dagr's or just the parent
 */

//this is what happens when you are on the ui and click a folder
//it will render all DIRECT children of one dagr
//this is broken for the moment
exports.getCategory = function(req,res) {
    var user_id = req.params.user_id;
    var dagr_id = req.params.dagr_guid;
    var qb = Dagr.query();
    qb.where({guid: dagr_id}).whereNull('deletion_time').select().then(
        function(resp) {
            if(resp.length == 0) {
                return res.render('user', {
                title: 'My MMDA',
                is_single:true,
                dagr: resp,
                u_id: user_id,
                dagrs: [],
                dagr_guid: req.params.dagr_guid
                } )
            }
            else {
                var query = Parent_child.query();
                query.where({parent_dagr_guid: dagr_id}).select().then(
                    function(resp2) {
                        console.log('resp2')
                        if(resp2.length == 0) {
                            console.log('did it make it')
                            var query = Dagr_doc.query()
                            query.where({dagr_guid: resp[0].guid}).join('document', 'document.guid', 'dagr_doc.document_guid').select().then(
                                function(resp4) {
                                    console.log('resp4')
                                    var url = resp4[0].filepath_url;
                                    resp[0].path = url
                                    return res.render('user', {
                                        title: 'DAGR: '+resp[0].name,
                                        is_single: url ? true : false,
                                        dagr: resp[0],
                                        dagrs : [],
                                        dagr_guid: req.params.dagr_guid
                                    })
                                }
                            )
                        }
                        else {
                            var str_arr = []
                            for (var i =0; i<resp2.length;i++) {
                                str_arr.push(resp2[i]['child_dagr_guid'])
                            }
                            var query2 = Dagr.query();
                            query2.whereIn('guid', str_arr).select().then(
                                function(resp3) {
                                    console.log('hi');
                                    return res.render('user', {
                                        title: 'Category DAGR: '+resp[0]['name'],
                                        is_single: false,
                                        dagr: resp,
                                        dagrs: resp3,
                                        u_id: user_id,
                                        dagr_guid: req.params.dagr_guid                                  
                                      })
                                }
                            )
                        }
                    }
                )
            }
        }
    )

}
