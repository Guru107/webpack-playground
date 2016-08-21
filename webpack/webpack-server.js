var path = require('path')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpackConfig = require('./config.dev.client')
var webpackServerConfig = require('./config.dev.server')

export const compiler = webpack(webpackConfig)
export const serverCompiler = webpack(webpackServerConfig)

var devMiddleware = webpackDevMiddleware(compiler,{
	noInfo:true,
	publicPath:webpackConfig.output.publicPath
})
var hotMiddleware = webpackHotMiddleware(compiler)

var serverMiddleWare = webpackDevMiddleware(serverCompiler,{
	noInfo:true,
	publicPath:webpackServerConfig.output.publicPath
})
var serverHotMiddleWare = webpackHotMiddleware(serverCompiler)

export default app => {
	console.log('webpack-server - app use')
	app.use(devMiddleware)
	app.use(hotMiddleware)
	app.use(serverMiddleWare)
	app.use(serverHotMiddleWare)
}



