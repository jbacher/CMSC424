
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function(table) {
      table.increments();
      table.string('name');
      table.string('email');
      table.string('password');
      table.string('passwordResetToken');
      table.dateTime('passwordResetExpires');
      table.string('gender');
      table.string('location');
      table.string('website');
      table.string('picture');
      table.string('facebook');
      table.string('twitter');
      table.string('google');
      table.string('vk');
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('dagr', function(table) {
      table.string('guid').primary();
      table.string('name');
      table.dateTime('creation_time');
      table.time('deletion_time');
      table.dateTime('last_Modified');
      table.integer('size');
      table.string('author_id');
    //   table.foreign('author_id').references('users.facebook');
    }),
    knex.schema.createTableIfNotExists('parent_child', function(table) {
      table.string('parent_dagr_guid');
      table.string('child_dagr_guid');
    //   table.foreign('parent_dagr_guid').references('dagr.guid');
    //   table.foreign('child_dagr_guid').references('dagr.guid');
    }),
    knex.schema.createTableIfNotExists('document', function(table) {
      table.string('guid');
      table.string('filepath_url');
    }),
    knex.schema.createTableIfNotExists('dagr_doc', function(table){
      table.string('dagr_guid');
      table.string('document_guid');
    //   table.foreign('dagr_guid').references('dagr.guid');
    //   table.foreign('document_guid').references('document.guid');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('dagr'),
    knex.schema.dropTable('parent_child'),
    knex.schema.dropTable('document'),
    knex.schema.dropTable('dagr_doc')
  ])
};
