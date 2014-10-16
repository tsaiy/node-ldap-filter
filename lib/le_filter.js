// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function LessThanEqualsFilter(options) {
  if (typeof (options) === 'object') {
    assert.string(options.attribute, 'options.attribute');
    assert.string(options.value, 'options.attribute');
    this.attribute = options.attribute;
    this.value = options.value;
  }

  var self = this;
  this.__defineGetter__('type', function () { return 'le'; });
  this.__defineGetter__('json', function () {
    return {
      type: 'LessThanEqualsMatch',
      attribute: self.attribute,
      value: self.value
    };
  });
}


LessThanEqualsFilter.prototype.toString = function () {
  return ('(' + helpers.escape(this.attribute) +
          '<=' + helpers.escape(this.value) + ')');
};


LessThanEqualsFilter.prototype.matches = function (target) {
  assert.object(target, 'target');

  var tv = helpers.getAttrCaseless(target, this.attribute);
  var value = this.value;

  return helpers.multiTest(function (v) {
    return value >= v;
  }, tv);
};


///--- Exports

module.exports = LessThanEqualsFilter;