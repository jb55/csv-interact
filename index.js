
var csv = {};
csv.parse = require('csv-parse');
csv.stringify = require('csv-stringify');

var record = require('csv-record-parser-stream');
var parser = require('tableize-csv-parser');
var json2csv = require('jb55-json2csv');
var fs = require('fs');
var through = require('through2').obj;

module.exports = function(fn, opts) {
  opts = opts || {};
  var delimiter = opts.delimiter || ",";
  var csvOpts = { delimiter: delimiter };

  process.stdin
  .pipe(csv.parse(csvOpts))
  .pipe(record(parser()))
  .pipe(through(function(obj, enc, done){
    fn.call(this, obj, done);
  }))
  .pipe(json2csv())
  .pipe(csv.stringify(csvOpts))
  .pipe(process.stdout);
};
