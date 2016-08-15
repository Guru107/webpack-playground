var path = require('path')
var precss = require('precss')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

const PATHS = {
	APP:path.join(__dirname,'..','src/app'),
	SRC:path.join(__dirname,'..','src'),
	BUILD:path.join(__dirname,'..','build'),
	CLIENT:path.join(__dirname,'..','src/client'),
	SERVER:path.join(__dirname,'..','src/server'),
	STYLES:path.join(__dirname,'..','styles'),
	NODE_MODULES:path.join(__dirname,'..','node_modules')
}

module.exports = {
	target:'web',
	devtool:'source-map',
	entry:{
		app:PATHS.CLIENT,
		vendor:['react','react-router','react-dom']
	},
	output:{
		path:PATHS.BUILD,
		publicPath:'/static/',
		filename:'js/[name].[chunkhash].js',
		chunkFilename:'js/[chunkhash].js'
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
	module:{
		loaders:[
			{
				test:/\.less/,
				loader:ExtractTextPlugin.extract('style-loader','css!less?lint&noIeCompat&strictImports&strictUnits!postcss-loader?sourceMap=inline&pack=cleaner'),
				exclude:['/node_modules/',PATHS.SRC],
  				include:PATHS.STYLES

			},
			{
				test:/\.js$/,
				include: PATHS.SRC,
				loader:'babel?presets[]=es2015,presets[]=react',
				exclude:['/node_modules/']
			},
		]
	},
	postcss:function(){
  		return {
  			defaults: [precss, autoprefixer],
  			cleaner:  [autoprefixer()]
  		}
  	},
	profile:true,
	  	plugins:[
  			new webpack.optimize.OccurenceOrderPlugin(),
  			new webpack.optimize.DedupePlugin(),
  			new webpack.optimize.UglifyJsPlugin({
  				compress:{
  					warnings:false,
  					drop_console:true,
  					keep_fargs:false
  				}
  			}),
  			new webpack.optimize.CommonsChunkPlugin({
  				names:['app','vendor'],
  				async:true
  			}),
  			new webpack.optimize.AggressiveMergingPlugin(),
  			//This plugin ensures that there are no assets emitted that include errors
  			new webpack.NoErrorsPlugin(),
  			new webpack.DefinePlugin({
  				'__PROD__':JSON.stringify(true),
  				'__DEV__':JSON.stringify(false),
  				'__CLIENT__':JSON.stringify(true),
  				'__SERVER__':JSON.stringify(false)
  			}),
  			new ExtractTextPlugin("css/[name].[chunkhash].css")


  	]


}
