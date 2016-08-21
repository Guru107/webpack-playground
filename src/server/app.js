
import path from 'path'

import React from 'react'

import { match,createMemoryHistory,RouterContext,useRouterHistory } from 'react-router'
import { renderToString } from 'react-dom/server'
import getRoutes from 'routes'
import Html from 'Html'




/*server.get('*',(req,res)=>{
	const routes = getRoutes()
	const history = useRouterHistory(createMemoryHistory)({})
	let component = ''
	match({history,routes:routes, location:req.originalUrl},(error, redirectLocation, renderProps)=>{
		if(renderProps){
			component = renderToString(<RouterContext {...renderProps}/>)
			const html = `<!DOCTYPE html>${renderToString(<Html component={component}/>)}`
			res.status(200).send(html)
		}
	})
})*/

export const render = (originalUrl) => {
	return new Promise((resolve,reject)=>{
		const routes = getRoutes()
		const history = useRouterHistory(createMemoryHistory)({})
		let component = ''
		let assets = ''

		match({history,routes:routes, location:originalUrl},(error, redirectLocation, renderProps)=>{
			if(error){
				reject(error)
			}else if(redirectLocation){
				const redirect = redirectLocation.pathname + redirectLocation.search
				resolve({status:301,redirect:redirect})
			}else if(renderProps){
				component = renderToString(<RouterContext {...renderProps}/>)
				assets = webpackTools.assets()
				const html = `<!DOCTYPE html>${renderToString(<Html component={component} assets = {assets}/>)}`
				resolve({status:200,body:html})
			}else{
				const e = new Error('Not Found')
				e.status = 404
				reject(e)
			}
		})
	})
}

if(__DEV__){
	const { compiler } = require('../../webpack/webpack-server')
	 compiler.plugin('done',()=>{
	 	Object.keys(require.cache)
	 			.filter(module => module.startsWith(__dirname))
	 			.forEach(module => delete require.cache[module])
	 	webpackTools.refresh()
	 })
}

