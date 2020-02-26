var express = require('express');
var router = express.Router();
var NodeModel = require('../apps/models/node_model');

router.get('/node/:id', function(req, res, next) {
  var id = req.params.id;
  NodeModel.getTopic(id, function(err, data) {
    return res.render('topicview', data);
  });
});


module.exports = router;
