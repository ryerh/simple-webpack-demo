// webpack should be in the node_modules directory, install if not.
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT = __dirname

// single entrance
const configuration = {
  devtool: '#eval-source-map',
  entry: ROOT + '/src/entry.js',
  output: {
    path: ROOT + '/dist', // must be absolute path
    filename: 'js/bundle.js', // relative to output.path
    publicPath: '/dist' // url path prefix
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'), // relative to output.path
    new HtmlWebpackPlugin({
      template: ROOT + '/src/index.html',
      filename: 'index.html', // relative to output.path
      inject: true
    })
  ]
}

const compiler = webpack(configuration)

compiler.watch({ // watch options:
  aggregateTimeout: 300, // wait so long for more changes
  poll: true // use polling instead of native watchers
  // pass a number to set the polling interval
}, function(err, stats) {
  console.log('webpack is running...')
})
