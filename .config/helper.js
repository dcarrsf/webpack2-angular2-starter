const path = require('path');

// Helper function
module.exports = function (args) {
  args = Array.from(arguments);
  return path.join.apply(path, [__dirname, '../'].concat(args));
}