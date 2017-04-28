var bookshelf = require('../config/bookshelf');

var Document = bookshelf.Model.extend({
    tableName: 'document'
})

module.exports = Document;