var User = require('../models/User');
var Dagr = require('../models/Dagr');
var Parent_child = require('../models/Parent_child');


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
            dagrs: resp
        })
        //above is temporary
    })

    //this should only do top-level queries
    //ones that have no parent
};

exports.getMMDA = function(req, res){
    var user_id = req.params.user_id;
    //this is the range query
    var subquery = Dagr.query();
    subquery.join('parent_child', 'guid', 'parent_child.parent_dagr_guid')
    .select('dagr.guid');

    var qb = Dagr.query();
    qb.where({author_id: user_id}).where('guid', 'not in', subquery).whereNull('deletion_time').select().then(function(resp){
        console.log(resp);
        res.render('user', {
            dagrs: resp,
            title: 'My MMDA'
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
exports.getCategory = function(req,res) {
    var user_id = req.params.user_id;
    var dagr_id = req.params.dagr_guid;
    var qb = Dagr.query();
    qb.where({guid: dagr_id}).whereNull('deletion_time').select().then(
        function(resp) {
            console.log(resp);
            if(resp == []) {
                return res.render('user', {
                title: 'My MMDA',
                is_single:true,
                dagr: resp
                } )
            }
            else {
                var query = Parent_child.query();
                query.where({parent_dagr_guid: dagr_id}).select().then(
                    function(resp2) {
                        if(resp2 == []) {
                            return res.render('user', {
                                title: 'My MMDA',
                                is_single: true,
                                dagr: resp
                            })
                        }
                        else {
                            return res.render('user', {
                                title: 'My MMDA',
                                is_single: false,
                                dagr: resp,
                                dagrs: resp2
                            })
                        }
                    }
                )
            }
        }
    )

}
