
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('name');
      table.string('email').unique();
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
    knex.schema.createTable('dagr', function(table) {
      table.uuid('guid').primary();
      table.string('name');
      table.time('creation_time');
      table.time('deletion_time');
      table.time('last_Modified');
      table.integer('size');
      table.string('author');
      table.foreign('author').references('users.email');
    }),
    knex.schema.createTable('parent_child', function(table) {
      table.uuid('parent_dagr_guid');
      table.uuid('child_dagr_guid');
      table.foreign('parent_dagr_guid').references('dagr.guid');
      table.foreign('child_dagr_guid').references('dagr.guid');
    }),
    knex.schema.createTable('document', function(table) {
      table.uuid('guid');
      table.string('filepath_url');
    }),
    knex.schema.createTable('dagr_doc', function(table){
      table.uuid('dagr_guid');
      table.uuid('document_guid');
      table.foreign('dagr_guid').references('dagr.guid');
      table.foreign('document_guid').references('document.guid');
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
