import React, { Component } from 'react'

class Html extends Component {
	render(){
		const { component } = this.props
		//TODO
		//Load Assets dynamically
		return (
			<html>
				<head>
					<title>Webpack</title>
					<meta charSet='utf-8'/>
					<link rel='stylesheet' type='text/css' href='/static/main.css'/>
				</head>
				<body>
					<div id='mount-point' dangerouslySetInnerHTML={{__html:component}}>
					</div>
					<script src='/static/bundle.js'></script>
				</body>
			</html>
		)
	}
}
export default Html
