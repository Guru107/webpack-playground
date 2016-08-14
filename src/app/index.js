import React,{ Component } from 'react'
import { Router, browserHistory } from 'react-router'

import getRoutes from 'routes'
const routes = getRoutes()
class App extends Component{
	render(){
		return (
			<div>
				<Router history={ browserHistory } routes={ routes }/>
			</div>
		)
	}
}
export default App
