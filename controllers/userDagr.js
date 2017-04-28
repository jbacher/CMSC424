var User = require('../models/User');
var Dagr = require('../models/Dagr');


//TODO remember not return deleted ones

exports.getMMDA = function(req, res) {
    var user_id = req.params.user_id;
    var qb = Dagr.query();
    qb.where({author_id: user_id}).select()
    .then(function(resp) {
        console.log(resp);
        res.send(resp)
        //above is temporary 
    })
    //the id corresponds to the "facebook" column of the user table
    //use a an api endpoint (or do it here)
        //execute a query 
        //use bookshelfjs syntax
        //grab all of the top level DAGRs and render them using the jade template engine
    //THERE WILL BE AN OPTION TO DISPLAY ALL LOWEST LEVEL DARGS USING THE RANGE QUERY
    // return res.render('user', {
        
    // })
};

exports.getAll = function(req, res){
    var user_id = req.params.user_id;
    //this is the range query 
    var subquery = Dagr.query();
    subquery.join('parent_child', 'author_id', 'parent_child.parent_dagr_guid')
    .select('dagr.author_id');

    var qb = Dagr.query();
    qb.select().where('author_id', 'not in', subquery).then(function(resp){
        console.log(resp);
        res.send(resp);
    })
    
    // return res.render('user', {
// 
    // })
};

