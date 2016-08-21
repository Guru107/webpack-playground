import express from 'express'

const server = express()

if(__DEV__){
	console.log('bootup - __DEV__')
	const webpack = require('../../webpack/webpack-server').default

	webpack(server)
}else{
	let publicPath = path.join(process.cwd(),'build')
	server.use('/static', express.static(publicPath,{setHeaders:(res)=>{
			res.set('Service-Worker-Allowed','/')
	}}))
}

server.get('*',(req,res)=>{
	const { render } = require('./app')
	render(req.originalUrl).then((renderArgs)=>{
		const { status,redirect,body } = renderArgs
		res.status(status)
		if(redirect){
			res.redirect(redirect)
		}else{
			res.send(body)
		}
	})
})

export default server
