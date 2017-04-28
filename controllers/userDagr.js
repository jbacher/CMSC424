var User = require('../models/User');
var Dagr = require('../models/Dagr');


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
        res.send(resp)
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
        res.send(resp);
    })
    
    // return res.render('user', {
// 
    // })
};

//this is what happens when you are on the ui and click a folder
//it will render all DIRECT children of one dagr
exports.getCategory = function(req,res) {

}