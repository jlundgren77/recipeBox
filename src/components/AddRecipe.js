import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import AddRecipeForm from './AddRecipeForm';


export default class AddRecipe extends Component {
	constructor(props) {
		super(props);
		this.addRecipe = this.addRecipe.bind(this);
		this.state = {
			show: false,
			name: "",
			category: "",
			directionsList: "",
			ingredientList: ""
		}


		
	}

	getArr(s) {

		
		var convertedStr = s.split(",");
		for(var i = 0; i < convertedStr.length; i++) {
			convertedStr[i] = convertedStr[i].replace(/\s+/g, " ").trim();
		}


		
		return(convertedStr);
	}

	addRecipe(name, category, ingredients, directions) {
        
		var ingredientList = this.getArr(ingredients);

		var directionsList = this.getArr(directions);
		var title = name.replace(/\s+/g, " ").trim();
		
		this.props.updateRecipeBox(title, category, ingredientList, directionsList);
		
		
		
	}
    
    
	
	render() {

		let close = () => this.setState({show: false});



		return (
			<div className="addRecipeForm">
			<div className="modal-container" style={{height: 200}}>
				<Button
					className="addRecipeBtn"
					onClick={() => this.setState({ show: true })}
				>
					Add Recipe
				</Button>

				<Modal
					show={this.state.show}
					onHide={close}
					container={this}
					aria-labelledby="contained-modal-title"
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
					</Modal.Header>
					<Modal.Body>
							Add form here
							<AddRecipeForm onAdd={this.addRecipe}/>
					</Modal.Body>
					<Modal.Footer>
							<Button onClick={close}>Close</Button>
					</Modal.Footer>
					
				</Modal>
			</div>
			</div>

		);


		
	}
}