// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var assert = require('assert-plus');


///--- API

function AndFilter(options) {
  if (typeof (options) === 'object') {
    assert.arrayOfObject(options.filters, 'options.filters');
  } else {
    options = {};
  }

  this.__defineGetter__('type', function () { return 'and'; });
  this.filters = options.filters ? options.filters.slice() : [];

  var self = this;
  this.__defineGetter__('json', function () {
    return {
      type: 'And',
      filters: self.filters
    };
  });
}


AndFilter.prototype.toString = function () {
  var str = '(&';
  this.filters.forEach(function (f) {
    str += f.toString();
  });
  str += ')';

  return str;
};


AndFilter.prototype.matches = function (target) {
  assert.object(target, 'target');

  if (this.filters.length === 0) {
    return false;
  }

  for (var i = 0; i < this.filters.length; i++) {
    if (!this.filters[i].matches(target))
      return false;
  }

  return true;
};


AndFilter.prototype.addFilter = function (filter) {
  assert.object(filter, 'filter');

  this.filters.push(filter);
};


///--- Exports

module.exports = AndFilter;