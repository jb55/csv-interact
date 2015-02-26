
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
  var first = true;
  var fast = opts.fields != null || opts.fast === true;

  var stream = process.stdin
  .pipe(csv.parse(csvOpts))
  .pipe(record(parser()))
  .pipe(through(function(obj, enc, done){
    if (fast && first) {
      var keys = Object.keys(obj)
      this.pipe(json2csv(opts.fields || keys))
      .pipe(csv.stringify(csvOpts))
      .pipe(process.stdout);
    }
    first = false;
    fn.call(this, obj, done);
  }))

  if (!fast) {
    stream
    .pipe(json2csv())
    .pipe(csv.stringify(csvOpts))
    .pipe(process.stdout);
  }
};
