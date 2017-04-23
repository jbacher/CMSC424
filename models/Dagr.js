var bookshelf = require('../config/bookshelf');

var Dagr = bookshelf.Model.extend({
    tableName: 'dagr'
})

module.exports = Dagr;