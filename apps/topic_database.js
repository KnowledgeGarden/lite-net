var Datastore = require('nedb')
var Database;
var instance;

Database = function() {
  var db = new Datastore({ filename: './data/topics' , autoload: true });
  console.info('Database '+db);
  var self = this;

  self.put = function(jsonDoc, callback) {
    db.insert(jsonDoc, function (err, newDoc) {
      return callback(err, newDoc);
    });
  };

  /**
   * @param id 
   * @parm backlink
   * @param callback { err }
   */
  self.addBacklink = function(id, backlink, callback) {
    db.update({ id: id }, { $push: { backlinks: backlink } }, {}, function (err) {
      return callback(err);
    });
  };

  self.addBodyText = function(id, bodytext, callback) {
    db.update({ id: id }, { $push: { bodylist: bodytext } }, {}, function (err) {
      return callback(err);
    });
  };
  /**
   * @param id 
   * @param callback { err, data}
   */
  self.get = function(id, callback) {
    db.findOne({ id: id }, function (err, doc) {
      console.info("FindTopic", err, doc);
      return callback(err, doc);
    });
  };

  
};

if (!instance) {
  instance = new Database();
}
module.exports = instance;