const plugin = require('webpack-isomorphic-tools/plugin')

const path = require('path')
const PATHS = {
	SRC:path.join(__dirname,'..','src'),
	CLIENT:path.join(__dirname,'..','src/client'),
	SERVER:path.join(__dirname,'..','src/server'),
	STYLES:path.join(__dirname,'..','styles'),
	BUILD:path.join(__dirname,'..','build'),
	APP:path.join(__dirname,'..','src/app'),
	NODE_MODULES:path.join(__dirname,'..','node_modules')
}
const config = {
	debug: false,
	webpackAssetsFilePath:PATHS.SRC+'/webpack-assets.json',
	webpackStatsFilePath: PATHS.SRC+'/webpack-stats.json',
	assets:{
		less : {
			extensions:['less'],
			filter:(module,regex,options,log) =>{

				if(options.development){
					return plugin.styleLoaderFilter(module,regex,options,log)
				}

				return regex.test(module.name)
			},
			path:(module,options,log)=>{

				if(options.development){
					return plugin.styleLoaderPathExtractor(module,options,log)
				}

				return module.name
			},
			parser:(module,options,log)=>{
				if(options.development){
					return plugin.cssModulesLoaderParser(module,options,log)
				}
				return module.source
			}
		}
	}
}

module.exports = config
