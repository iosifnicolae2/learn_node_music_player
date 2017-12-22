var request = require("request");
var fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);


if(typeof(String.prototype.trim) === "undefined") {
  String.prototype.trim = function() {
    return String(this).replace(/^\s+|\s+$/g, '').replace('\n','');
  };
}


var getJsonFromTable = function(table) {
  var rows = [];
  $(table).find('tbody tr').each(function(i, n){
                var $row = $(n);
                rows.push({
                    nr: $row.find('td:eq(0)').text().trim(),
                    denumire: $row.find('td:eq(1)').text().trim(),
                    cantitate: $row.find('td:eq(2)').text().trim(),
                    pret: $row.find('td:eq(3)').text().trim(),
                });
            });
            delete rows[0];
            return rows;
};

module.exports = function(callback) {
  fs.readFile('output/meniu.html', 'utf8', function (err, body) {
    if (err) {
      return console.log(err);
    }
    var $body = $(body);
    var date = $body.find("#dnn_ctr793_HtmlModule_lblContent > p > strong > span").text().replace("DATA:", '').trim();
    var $table = $body.find("#dnn_ctr793_HtmlModule_lblContent > center > table");
    var tbl = getJsonFromTable($table);
    if(tbl.length == 0) {
      return console.log(body);
    }
    callback({date: date, tbl:tbl});
  });
}
