'use strict';

var functions = require('./utils/functions')();
var promises = require('./utils/promises')(Promise);

module.exports = require('./nightshift')(functions, promises);