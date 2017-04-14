import React, { Component } from 'react';

import EditRecipe from './EditRecipe.js';



class Recipe extends Component {

	constructor(props) {

		super(props);
		this.onEdit = this.onEdit.bind(this);
		this.getArray = this.getArray.bind(this);
	}
	getArray(str) {
		if (Array.isArray(str)){
			return str;
		}
		else {
			var splitStr = str.split(",");
			for (var i = 0; i<splitStr.length; i++) {
				splitStr[i] = splitStr[i].replace(/\s+/g, " ").trim();
			}
			return splitStr;
		}
	}
	onEdit(name, category, ingredients, directions, id, prevCat) {
		
        
		this.props.editRecipe(name, category, this.getArray(ingredients), this.getArray(directions), id, prevCat);
	}
	render() {
        
		return (
				<div>
					
					<div className="recipeContainer">
								<div className="recipe-header">
									<div className="editButton">
										<EditRecipe key={this.props.title}
														id={this.props.id}
														onEdit={this.onEdit} 
														name={this.props.title}
														category={this.props.category}
														ingredients={this.props.ingredients}
														directions={this.props.directions}
														/>
									</div>
									<div className="recipe-title">
										<h2>{this.props.title}</h2>
									</div>
								</div>	
						<div className="recipe-detail">
						
							<section className="ingredients">
								<h3>Ingredients</h3>
								<ul>
									{
										this.props.ingredients.map(function(ingredient, index) {
											return(
													<li key={index}>{ingredient}</li>
												);
										}, this)
									}
								</ul>
							</section>
							
							<section className="directions">
								<header><h3>Directions</h3></header>
								<ol className="recipe-directions">
									{
										this.props.directions.map(function(step, index) {
											return(
													<li key={index}>{step}</li>
												);

										}, this)
									}
								</ol>
							</section>
							
						</div>
					</div>
				</div>
			)
	}

};

export default Recipe;


