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

// var webpack = require('webpack');
// var path = require('path');
//
// module.exports = {
//   entry: [
//     'webpack/hot/dev-server',
//     'webpack-dev-server/client?http://localhost:3001',
//     './client/client-render.js'
//   ],
//   output: {
//     path: './dist/',
//     filename: 'build.js',
//     publicPath: '/dist/'
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin()
//   ],
//   // resolve: {
//   //   modulesDirectories: [
//   //     './components'
//   //   ],
//   //   extensions: ['', '.json', '.js', '.jsx']
//   // },
//   module: {
//     loaders: [{
//       test: /\.jsx?$/,
//       exclude: /node_modules/,
//       loaders: ['babel-loader'],
//       include: path.join(__dirname, '.')
//     }]
//   }
// };
