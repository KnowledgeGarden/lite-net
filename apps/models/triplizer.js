var Triplizer;
var instance;

Triplizer = function() {
  var self = this;

  self.findSubject = function(triple) {
    var begin = triple.indexOf("[[")+2;
    var end = triple.indexOf("]]", begin);
    var result = triple.substring(begin, end);
    console.info("SUBJ", triple, result);
    return result;
  }

  self.findObject = function(triple) {
    var begin = triple.indexOf("[[")+2;
    begin = triple.indexOf("[[", begin)+2;
    var end = triple.indexOf("]]", begin);
    var result = triple.substring(begin, end);
    console.info("OBJ", triple, result);
    return result;

  }

  self.findPredicate = function(triple) {
    var begin = triple.indexOf("]]")+2;
    var end = triple.indexOf("[[", begin);
    var result = triple.substring(begin, end).trim();
    console.info("PRED", triple, result);
    return result;
  }

  self.setHrefs = function(subject, sSlug, object, oSlug, predicate) {
    var result = "";
    var sHref = "<a href=\"/topic/"+sSlug+"\">"+subject+"</a>";
    var oHref = "<a href=\"/topic/"+oSlug+"\">"+object+"</a>";
    result += sHref+" ";
    result += predicate;
    result += " "+oHref;
    return result;
  }
}

if (!instance) {
  instance = new Triplizer();
}

module.exports = instance;