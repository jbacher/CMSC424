var bookshelf = require('../config/bookshelf');

var Parent_child = bookshelf.Model.extend({
    tableName: 'parent_child'
})

module.exports = Parent_child;