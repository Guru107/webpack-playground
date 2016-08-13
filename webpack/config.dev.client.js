var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
	SRC:path.join(__dirname,'..','src'),
	CLIENT:path.join(__dirname,'..','src/client'),
	SERVER:path.join(__dirname,'..','src/server'),
	STYLES:path.join(__dirname,'..','styles'),
	BUILD:path.join(__dirname,'..','build')
}

module.exports = {
	devtool: 'eval-source-map',
	entry:[PATHS.CLIENT,'webpack-dev-server/client?http://localhost:8080'],
	devServer:{
		hot:true,
		historyApiFallback: true,
		info:true,
		inline: true,
		progress: true
	},
	output:{
		path:PATHS.BUILD
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

  	]
}
