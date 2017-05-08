var path = require('path');
var mime = require('mime');
var fs = require('fs');

exports.download =  function(req, res){
    console.log(__dirname)
  var file = __dirname + '/../public/downloads/bulk_load.zip';

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
};