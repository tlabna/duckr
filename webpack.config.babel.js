import webpack from 'webpack'
import path from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist')
}

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(PATHS.app, 'index.html'),
  filename: 'index.html',
  inject: 'body'
})

// Assigns command we're running. EX: npm run start -> LAUNCH_COMMAND = start
const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const base = {
  entry: [
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'} // loader allows to use css modules
    ]
  },
  // Using Resolve{modules:} lets us use relative paths for named imports over absolute (i.e. containers instead of ../app/containers)
  // NOTE. Since doing this, node_modules had to be added as well to use dependencies
  resolve: {
    modules: [path.resolve('./app'), 'node_modules']
  }
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map', // This will show source code erros from console in browser rather than bundled file
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
    historyApiFallback: true
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()] // Hot Module Replacement allows changes to update in React but can maintain it's state (i.e. it won't refresh)
}

const productionConfig = {
  devtool: 'cheap-module-source-map', // smaller in size than devConfig (helps reduce total build size)
  plugins: [HTMLWebpackPluginConfig, productionPlugin]
}

/*
Note. Since this file was not being transpiled by babel, I couldn't use ES6 Features such as Object.assign(), const or imports
HOWEVER -> To get babel to work with webpack.config.js, simply add '.babel' in the filename (i.e. webpack.config.babel.js)
 */
export default Object.assign({}, base,
  isProduction === true ? productionConfig : developmentConfig
)
