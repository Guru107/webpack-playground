import express from 'express'
import path from 'path'

import React from 'react'

import { match,createMemoryHistory,RouterContext,useRouterHistory } from 'react-router'
import { renderToString } from 'react-dom/server'
import getRoutes from 'routes'
import Html from 'Html'
const app = express()
let publicPath = path.join(process.cwd(),'build')
app.use('/static', express.static(publicPath,{setHeaders:(res)=>{
		res.set('Service-Worker-Allowed','/')
}}))
console.log(publicPath)
app.get('*',(req,res)=>{
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
})

app.listen(3000,()=>{
	console.info('Listening to port:3000')
})
