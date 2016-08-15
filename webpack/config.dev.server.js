var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var precss = require('precss')
var autoprefixer = require('autoprefixer')

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
 })

const PATHS = {
	SRC:path.join(__dirname,'..','src'),
	CLIENT:path.join(__dirname,'..','src/client'),
	SERVER:path.join(__dirname,'..','src/server'),
	STYLES:path.join(__dirname,'..','styles'),
	BUILD:path.join(__dirname,'..','build'),
	APP:path.join(__dirname,'..','src/app'),
	NODE_MODULES:path.join(__dirname,'..','node_modules')
}
module.exports = {
	target:'node',
	context:PATHS.SRC,
	entry:[PATHS.SERVER],
	output:{
		path:PATHS.BUILD,
		filename:'backend.js',
		publicPath:'/static/'
	},
	externals: nodeModules,
	module:{
		loaders:[
			{
  				test:/\.less$/,
  				loader:ExtractTextPlugin.extract('style-loader','css!less?lint&noIeCompat&strictImports&strictUnits!postcss-loader?sourceMap=inline&pack=cleaner'),
  				exclude:['/node_modules/',PATHS.SRC],
  				include:PATHS.STYLES
  			},
			{
  				test:/\.js$/,
  				include: PATHS.SRC,
  				loader:'react-hot!babel?presets[]=es2015,presets[]=react',
  				exclude:['/node_modules/']
  			}
		]
	},
	postcss:function(){
  		return {
  			defaults: [precss, autoprefixer],
  			 cleaner:  [autoprefixer()]
  		}
  	},
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
	profile:true,
	plugins:[
  			new webpack.optimize.OccurenceOrderPlugin(),
  			new webpack.DefinePlugin({
  				'__PROD__':JSON.stringify(false),
  				'__DEV__':JSON.stringify(true),
  				'__CLIENT__':JSON.stringify(false),
  				'__SERVER__':JSON.stringify(true)
  			}),
  			new ExtractTextPlugin("[name].css")

  	]
}
