var Datastore = require('nedb')
var Database;
var instance;

Database = function() {
  var db = new Datastore({ filename: './data/journal' , autoload: true });
  console.info('Database '+db);
  var self = this;

  self.put = function(jsonDoc, callback) {
    db.insert(jsonDoc, function (err, newDoc) {
      return callback(err, newDoc);
    });
  };

  self.get = function(id, callback) {
    db.findOne({ id: id }, function (err, doc) {
      console.info("FindJournal", err, doc);
      return callback(err, doc);
    });
  };

  self.list = function(callback) {
    db.find({}, function(err, data) {
      console.info('NoteList', err, data);
      return callback(err, data);
    });
  };
};

if (!instance) {
  instance = new Database();
}
module.exports = instance;