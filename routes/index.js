var express = require('express');
var router = express.Router();
var NodeModel = require('../apps/models/node_model');


/* GET home page. */
router.get('/', function(req, res, next) {
  NodeModel.list(function(err, noteList) {
    var data = {};
    data.title = 'LiteNet';
    data.noteList = noteList;
    return res.render('index', data);
  });
});

router.get('/new_note_route', function(req, res, next) {
  console.info('NEW');
  var noteList = [];
  var x = {};
  x.details = '[[Foo]] causes [[Bar]]';
  noteList.push(x);
  var data = {};
  data.title = 'LiteNet';
  data.noteList = noteList;
  data.isNew = true;
  return res.render('index', data);
});

/**
 * Get page identified by its slug
 */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var data = {};
  data.title = 'LiteNet';
  data.id = id;
  return res.render('index', data);
});

router.post('/postnote', function(req, res, next) {
  var details = req.body.details;
  console.info('XXX', details);
  NodeModel.processTriple(details, function(err, dat) {
    NodeModel.list(function(err, noteList) {
      var data = {};
      data.title = 'LiteNet';
      data.noteList = noteList;
      return res.render('index', data);
    });  
  });
});

router.get('/topic/:id', function(req, res, next) {
  var id = req.params.id;
  NodeModel.getTopic(id, function(err, data) {
    return res.render('topicview', data);
  });
});

router.get('/journal/:id', function(req, res, next) {
  var id = req.params.id;
  console.info("GetJournal", id);
  NodeModel.getJournalEntry(id, function(err, data) {
    return res.render('journalview', data);
  });
});


module.exports = router;
