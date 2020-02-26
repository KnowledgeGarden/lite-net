var config = require('../../config/config.json');
var journalDB = require('../journal_database');
var topicDB = require('../topic_database');
var uuid = require('uuid');
var slugUtil = require('../slug');
var triplizer = require('./triplizer');
var NodeModel,
    instance;

NodeModel = function() {
  var self = this;

  /**
   * Process a term 
   *  either make a new node from that term if not exists
   *  else add backlink to it with the triple and its id
   * @param term
   * @param slug
   * @param triple
   * @param id of the triple journal entry
   * 
   */
  self.processNode = function(term, slug, triple, id) {
    topicDB.get(slug, function(err, data) {
      var bl ="<a href=\"/journal/"+id+"\">"+triple+"</a>";
      console.info('ProcessNode', err, data);
      if (data) {
        topicDB.addBacklink(slug, bl, function(err) {
          console.info("ABL", err);
        });
      } else {
        var json = {};
        json.id = slug;
        json.label = term;
        json.date = new Date();
        json.backlinks = [];
        json.backlinks.push(bl);
        topicDB.put(json, function(err, dat) {
          console.info('ProceessNode-1', err, dat);
        });
      }
    });
  };

  /**
   * Find subject and object and process them
   * @param triple
   * @param callback {err, dat}
   */
  self.processTriple = function(triple, callback) {
    var subject = triplizer.findSubject(triple);
    var object = triplizer.findObject(triple);
    var predicate = triplizer.findPredicate(triple);
    var uid = uuid.v4();
    var json = {};
    var subjectSlug = slugUtil.toSlug(subject);
    var objectSlug = slugUtil.toSlug(object);
    json.text = triplizer.setHrefs(subject, subjectSlug, object, objectSlug, predicate);
    json.subj = subject;
    json.pred = predicate;
    json.obj = object;
    json.date = new Date();
    json.id = uid;
    //process the topics
    self.processNode(subject, subjectSlug, triple, uid);
    self.processNode(object, objectSlug, triple, uid);
    // persist the journal entry
    journalDB.put(json, function(err, dat) {
      console.info("ProcessTriple", err, dat);
      return callback(err, dat);
    });

  };

  self.list = function(callback) {
    journalDB.list(function(err, data) {
      return callback(err, data);
    });
  };

  self.getTopic = function(id, callback) {
    topicDB.get(id, function(err, data) {
      return callback(err, data);
    });
  };

  self.getJournalEntry = function(id, callback) {
    console.info("NM-GJ", id);
    journalDB.get(id, function(err, data) {
      console.info("NM-GJ-1", err, data);
      return callback(err, data);
    });
  };

};

if (!instance) {
  instance = new NodeModel();
}
module.exports = instance;