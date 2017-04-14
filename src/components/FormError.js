import React, {Component} from 'react';


export default class FormError extends Component {


	render() {

		return(
			<div className="errorMessage">
				<p>{this.props.message}</p>
			</div>
			);
	}
}