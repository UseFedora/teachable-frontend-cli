const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const config = require('./static.config')
const tempPath = path.resolve(__dirname, '__temp__')
const rootPath = path.resolve(__dirname, '../../')

function getEntries(target) {
  return {
    main: path.resolve(target, 'src/index.ts'),
  }
}

function getOutput(target) {
  return {
    filename: '[name].bundle.js',
    path: path.resolve(target, './dist'),
    sourceMapFilename: '[name].bundle.map',
  }
}

function runDevServer() {
  const target = process.cwd()
  const entry = getEntries(target)
  const output = getOutput(target)
  const targetNodeModules = path.resolve(target, 'node_modules')
  const compiler = webpack(Object.assign({}, config, {
    entry,
    output,
    resolve: Object.assign({}, config.resolve, {
      modules: [
        targetNodeModules,
        'node_modules',
      ],
    }),
  }))

  new WebpackDevServer(compiler, {
    compress: true,
    contentBase: path.join(target, 'dist/'),
    hot: true,
    inline: true,
    stats: { colors: true },
  }).listen(8080, 'localhost', (err, result) => {
    if (err) {
      return console.error(err)
    }

    console.log('Webpack dev server successfully recompiled.')
  })
}

module.exports = {
  dev: runDevServer,
}
