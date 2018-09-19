import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import EditRecipeForm from './EditRecipeForm';


export default class EditRecipe extends Component {
	constructor(props) {
        super(props);
		this.editRecipe = this.editRecipe.bind(this);

		this.state = {
			show: false
		}
	}

   editRecipe(name, category, ingredients, directions, display, prevCat)  {
   		
    	this.setState({show: false});

    	this.props.onEdit(name, category, ingredients, directions, this.props.id, prevCat);

    }
 

	render() {
		let close = () => this.setState({show: false});
		return(
				<div>
				<div className="modal-container" style={{height: 200}}>
					<Button
						
						
						onClick={() => this.setState({ show:true })}

					>
						Edit Recipe
					</Button>
					
					<Modal
						show={this.state.show}
						onHide={close}
						container={this}
						aria-labelledby="contained-modal-title"
					>
						<Modal.Header closeButton>
							<Modal.Title id="contained-modal-title">Edit Your Recipe</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							
							<EditRecipeForm 
								onEdit={this.editRecipe}
								name={this.props.name}
								category={this.props.category}
								directions={this.props.directions}
								ingredients={this.props.ingredients}
								id={this.props.id}
							/>
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