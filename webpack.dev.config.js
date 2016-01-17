var path = require('path');
module.exports = {
  entry: path.join(__dirname, 'client/client-render.js'),
  output: {
    path: './dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      { test: /.js$/, loader: 'babel' }
    ]
  }
}
