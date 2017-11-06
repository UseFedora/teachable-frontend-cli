const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const config = require('./base.config')
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
  const instanceConfig = Object.assign({}, config, {
    entry,
    output,
    resolve: Object.assign({}, config.resolve, {
      modules: [
        path.resolve(target, 'node_modules'),
        'node_modules',
      ],
    })
  })
  const compiler = webpack(instanceConfig)

  new WebpackDevServer(compiler, {
    contentBase: path.join(target, 'dist/'),
    compress: true,
    inline: true,
    hot: true,
  }).listen(8080, 'localhost', (err, result) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('Webpack dev server successfully recompiled.')
  })
}

module.exports = {
  dev: runDevServer,
}
