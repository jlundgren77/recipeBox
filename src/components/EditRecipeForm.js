import React, {Component} from 'react';
import {Button, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import FormError from './FormError';





export default class EditRecipeForm extends Component {
	constructor(props) {

		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    state = {
    	recipeName: this.props.name,
    	prevRecipeCategory: this.props.category,
    	recipeCategory: this.props.category,
    	recipeIngredients: this.props.ingredients,
    	recipeDirections: this.props.directions,
    	errorMessage: "",
    	
    }


	


	


	handleSubmit = e =>{
		e.preventDefault();
		let name = this.state.recipeName;
		let category = this.state.recipeCategory.toLowerCase();
		let prevCat = this.state.prevRecipeCategory.toLowerCase();
		let ingredients = this.state.recipeIngredients;
		let directions = this.state.recipeDirections;
		if (!this.validateForm(name, category, ingredients, directions)) {
			
			return false;
		} else {
			this.setState({submitted: true})
			this.props.onEdit(name, category, ingredients, directions, this.props.id, prevCat);

		}

	}

	handleNameEdit = e => {

		this.setState({recipeName: e.target.value});
	}

	handleCategoryEdit = e => {
		this.setState({recipeCategory: e.target.value});
	}

	handleIngredientsEdit = e => {
		this.setState({recipeIngredients: e.target.value});
	}

	handleDirectionsEdit = e => {
		this.setState({recipeDirections: e.target.value});
	}

	validateForm(name, category, ingredients, directions ) {
		
		let validCat = this.checkCategory(category);
		if (validCat) {	
			if (name.length <=1 || category.length === 0 || ingredients.length === 0 || directions.length === 0) {
			
				this.setState({errorMessage: "All fields are required"});
				return false;
			}  else {
				return true;
			}

		} else {
			this.setState({errorMessage: "enter a valid category"});
			return false;
		}
		
		
	} 
	checkCategory(category) {
		 if (category === "appetizer" || category === "salad" || category === "main" || category === "dessert") {
		 	this.setState({errorMessage: ""});
		 	return true;
		 }
		 else {

		 	return false;
		 }

	}

	
	render() {

		return(
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="recipeName">
					<ControlLabel>Recipe Name</ControlLabel>
					<FormControl 
						type="text"
						placeholder="enter text"
						value={this.state.recipeName}
						onChange={this.handleNameEdit}

					/>
					
				</FormGroup>
				<FormGroup controlId="recipeCategory">
					<ControlLabel>Category</ControlLabel>
					<FormControl
						type="text"
						placeholder="enter Category"
						value={this.state.recipeCategory}
						onChange={this.handleCategoryEdit}
					/>
					<HelpBlock>Valid Categories: appetizer, salad, mains, desserts</HelpBlock>
				</FormGroup>
				<FormGroup controlId="recipeIngredients">
					<ControlLabel>Edit Ingredients</ControlLabel>
					<FormControl 
						componentClass="textarea" 
						value={this.state.recipeIngredients}
						onChange={this.handleIngredientsEdit}
					/>
					<HelpBlock>add ingredients seperated by commas</HelpBlock>
				</FormGroup>
				<FormGroup controlId="recipeDirections">
					<ControlLabel>Edit Directions</ControlLabel>
					<FormControl 
						componentClass="textarea" 
						value={this.state.recipeDirections}
						onChange={this.handleDirectionsEdit}
					/>
					<HelpBlock>add directions seperated by commas</HelpBlock>
				</FormGroup>
				<Button onClick={this.handleSubmit}>Edit Recipe</Button>

				<FormError message={this.state.errorMessage} />
			</form>
		);
	}
}