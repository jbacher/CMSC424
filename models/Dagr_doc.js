var bookshelf = require('../config/bookshelf');

var Dagr_doc = bookshelf.Model.extend({
    tableName: 'dagr_doc'
})

module.exports = Dagr_doc;