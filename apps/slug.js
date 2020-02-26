/**A utility file to convert a term to a slug */
var Slugger;
var instance;

Slugger = function() {
  var self = this;

  self.toSlug = function(term) {
    var result = term.toLowerCase();
    //TODO
    return result;
  }
}

if (!instance) {
  instance = new Slugger();
}
module.exports = instance;