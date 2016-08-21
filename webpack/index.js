const path = require('path')

const NODE_ENV = process.env.NODE_ENV || 'development'

global.__DEV__ = NODE_ENV !== 'production'
global.__PROD__ = NODE_ENV === 'production'
global.__SERVER__ = true
global.__CLIENT__ = false

if(__DEV__){
	require('babel-register')
	require('./webpack-server')
}

const basePath = path.resolve(__dirname,__DEV__ ? '../src':'/src5')
console.log(basePath)
const WebpackTools = require('webpack-isomorphic-tools')
const webpackToolsConfig = require('./webpack.isomorphic.tools')
global.webpackTools = new WebpackTools(webpackToolsConfig)
.development(__DEV__)
		.server(basePath,() => {
			const server = require(basePath+'/server').default
			console.log('server required')
			server.listen(3000,()=>{
				console.log('Listening to port 3000')
			})
})





