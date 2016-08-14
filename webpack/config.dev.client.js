var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackBrowserPlugin = require('webpack-browser-plugin');
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
	context:PATHS.SRC,
	devtool: 'eval-source-map',
	entry:[PATHS.CLIENT,'webpack-dev-server/client?http://localhost:8080'],
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
			PATHS.NODE_MODULES

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
		publicPath:'/',
		filename:'[name].bundle.js',
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
  				test:/\.js$/,
  				include: PATHS.SRC,
  				loader:'react-hot!babel?presets[]=es2015,presets[]=react',
  				exclude:['/node_modules/']
  			}
  		],
  	},
  	plugins:[
  			new webpack.optimize.OccurenceOrderPlugin(),
  			new webpack.HotModuleReplacementPlugin(),
  			new HtmlWebpackPlugin({
  				mobile:true,
  				inject:true
  			}),
  			new webpack.DefinePlugin({
  				'__PROD__':JSON.stringify(false),
  				'__DEV__':JSON.stringify(true),
  				'__CLIENT__':JSON.stringify(true),
  				'__SERVER__':JSON.stringify(false)
  			}),
  			new WebpackBrowserPlugin({
  				url:'http://localhost'
  			})

  	]
}
