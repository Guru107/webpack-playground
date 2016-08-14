import React,{ Component } from 'react'
import { Link } from 'react-router'
require('app/index')
class IndexPage extends Component {
	render(){
		return (
			<div className='label'>Home Page
			<Link to='/child'>Child</Link></div>
		)
	}
}
export default IndexPage
