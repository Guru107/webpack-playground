import React from 'react'
import { Route,IndexRoute } from 'react-router'
import IndexPage from 'IndexPage'
import ChildComponent from 'components/ChildComponent'
export default () => {
	return (
		<Route path='/'>
			<IndexRoute component={IndexPage}/>
			<Route path='/child' component={ChildComponent}/>
		</Route>
	)
}
