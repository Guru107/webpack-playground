/**
	This is created to work with webpack hot middleware
	There is no difference between this and config.dev.client.js
	just the webpack-hot-middleware in 'entry' property and removed HtmlWebpackPlugin.

	PS:Feeling lazy

*/
var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var WebpackToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackToolsConfig = require('./webpack.isomorphic.tools')
var precss       = require('precss')
var autoprefixer = require('autoprefixer')

const PATHS = {
	SRC:path.join(__dirname,'..','src'),
	CLIENT:path.join(__dirname,'..','src/client'),
	SERVER:path.join(__dirname,'..','src/server'),
	STYLES:path.join(__dirname,'..','styles'),
	BUILD:path.join(__dirname,'..','build'),
	APP:path.join(__dirname,'..','src/app'),
	NODE_MODULES:path.join(__dirname,'..','node_modules')
}

// Globals
const NODE_ENV = process.env.NODE_ENV || 'development'
global.__DEV__ = NODE_ENV !== 'production'
global.__PROD__ = NODE_ENV === 'production'
global.__SERVER__ = true
global.__CLIENT__ = false

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
 })

module.exports = {
	context:PATHS.SRC,
	devtool: 'eval-source-map',
	entry:[PATHS.CLIENT,'webpack-hot-middleware/client?path=/__what&timeout=2000&overlay=true'],
	devServer:{
		contentBase:'./build',
		hot:true,
		historyApiFallback: true,
		info:false,
		inline: true,
		progress: true
	},
	//Report first error as hard error
	//Breaks the build on first error
	//Don't use in production
	bail:true,
	resolve:{
		extensions:['','.js','.less'],
		root:[
			PATHS.CLIENT,
			PATHS.APP,
			PATHS.SERVER
		],
		alias:{
			'app$':PATHS.APP,
			'client$':PATHS.CLIENT,
			'server$':PATHS.SERVER
		},
		modulesDirectories:[
			PATHS.CLIENT,
			PATHS.APP,
			PATHS.SERVER,
			PATHS.NODE_MODULES,
			PATHS.STYLES

		]
	},
	//Capture timing information for each module.
	profile:true,
	//Cache generated modules and chunks to improve performance for multiple incremental builds.
	cache:true,
	//Commented recordsPath as it generated an asset json which is not needed as OrderOccurancePlugin
	//Solves the problem of bundling the files in the same order
	//Either use recordsPath or OrderOccurancePlugin not both
	//recordsPath:PATHS.BUILD+'/asset.json',
	output:{
		path:PATHS.BUILD,
		publicPath:'/static/',
		filename:'bundle.js',
		//Don't use it in production
		//Includes comments with info about the module
		pathinfo:true
	},
	eslint: {
    	configFile: path.join(__dirname,'..','.eslintrc')
  	},
  	module:{
  		preLoaders:[
  			{
  				test:/\.js$/,
  				include: PATHS.SRC,
  				loader:'eslint',
  				exclude:['/node_modules/']
  			}
  		],
  		loaders:[
  			{
  				test:/\.less$/,
  				loader:'style!css!less?lint&noIeCompat&strictImports&strictUnits!postcss-loader?sourceMap=inline&pack=cleaner',
  				exclude:['/node_modules/',PATHS.SRC],
  				include:PATHS.STYLES
  			},
  			{
  				test:/\.js$/,
  				include: PATHS.SRC,
  				loader:'react-hot!babel?presets[]=es2015,presets[]=react',
  				exclude:['/node_modules/']
  			}
  		],
  	},
  	postcss:function(){
  		return {
  			defaults: [precss, autoprefixer],
  			 cleaner:  [autoprefixer()]
  		}
  	},
  	plugins:[
  			new webpack.optimize.OccurenceOrderPlugin(),
  			new webpack.HotModuleReplacementPlugin(),
  			new WebpackToolsPlugin(webpackToolsConfig).development(__DEV__),
  			new webpack.DefinePlugin({
  				__DEV__,
        		__PROD__,
        		__SERVER__,
        		__CLIENT__
  			})

  	]
}
