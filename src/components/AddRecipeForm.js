import React, {Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import FormError from './FormError';



export default class AddRecipeForm extends Component {
	constructor() {

		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	state = {
		recipeName: " ",
		recipeCategory: "",
		recipeIngredients: "",
		recipeDirections: "",
		errorMessage: ""

	}

	handleSubmit = e => {

		e.preventDefault();
		let name = this.state.recipeName;
		let category = this.state.recipeCategory;
		let ingredients = this.state.recipeIngredients;
		let directions = this.state.recipeDirections;

		if (!this.validateFields(name, category, ingredients, directions)) {
			
			return false;
		} else {
			this.props.onAdd(name, category, ingredients, directions);
		}
		

		this.setState({recipeName: '', recipeCategory: '',
			recipeIngredients: "add ingredients sepearted by commas",
			recipeDirections: "add recipe directions sepearted by commas",
			errorMessage: ""
		});

		e.currentTarget.reset();
	}

	handleNameChange = e => {
		
        	this.setState({recipeName: e.target.value});
        
		
	}

	handleCategoryChange = e => {
        
		this.setState({recipeCategory: e.target.value});
	}

	handleIngredientChange = e => {

		this.setState({recipeIngredients: e.target.value})
	}

	handleDirectionChange = e => {
		this.setState({recipeDirections: e.target.value})
	}

	

	validateFields(name, category, ingredients, directions) {
		
		if (name.length <=1 || category.length === 0 || ingredients.length === 0 || directions.length === 0) {
			
			this.setState({errorMessage: "All fields are required"});
			return false;
		} else {
			return true;
		}
		
	}

	render() {

		return(
			
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="recipeName" >
					<ControlLabel>Recipe Name</ControlLabel>
					<FormControl 
						type="text"
						placeholder="enter text"
						value={this.state.recipeName}
						onChange={this.handleNameChange}
						
					/>
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup controlId="recipeCategory">
					<ControlLabel>Select Category</ControlLabel>
					<FormControl componentClass="select" placeholder="select" onChange={this.handleCategoryChange}>
					    <option value="select">---</option>
						<option value="Appetizer">Appetizer</option>
						<option value="Salad">Salad</option>
						<option value="Main">Main</option>
						<option value="Dessert">Dessert</option>

					</FormControl>
				</FormGroup>
				<FormGroup controlId="recipeIngredients">
					<ControlLabel>Add Ingredients</ControlLabel>
					<FormControl componentClass="textarea"
						value={this.state.recipeIngredients}
						onChange={this.handleIngredientChange} 
						placeholder="add ingredients sepearted by commas"
					/>	
				</FormGroup>
				<FormGroup controlId="recipeDirections">
					<ControlLabel>Add Directions</ControlLabel>
					<FormControl componentClass="textarea" 
						placeholder="add recipe directions sepearted by commas"
						value={this.state.recipeDirections}
						onChange={this.handleDirectionChange}
					/>	
				</FormGroup>
				<Button onSubmit={this.handleSubmit} type="submit">
					Add
				</Button>
				<FormError message={this.state.errorMessage}/>
			</form>
			

		);
	}
}