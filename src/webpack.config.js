var path = require('path');
module.exports = {
 entry: './4.1.lesson/src/index.js',
 output: {
 filename: 'boundle.js',
 path: path.resolve(__dirname, 'dist')
 }
};