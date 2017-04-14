import React, { Component } from 'react';
import { Tabs, Tab, Grid, Row , Col} from 'react-bootstrap';

import Recipe from './Recipe.js';        
import AddRecipe from './AddRecipe.js';


const initialData = 

  	{

	  	Appetizer: [
	  		{
	  			title: "Crab Dip",
	  			category: "appetizer",
	  			ingredients: ['crab', 'sour cream', 'old bay'],
	  			directions: ['cook', 'stir', 'serve']
	  		},
	  		{
	  			title: "Cobb Salad",
	  			category: "appetizer",
	  			ingredients: ['eggs'],
	  			directions: ['peel', 'add', 'rest']
	  		}
	  	],


	  	Salad: [
	  		{
	  			title: "Chefs Salad",
	  			category: "salad",
	  			ingredients: ['eggs'],
	  			directions: ['toss with salad dressing', 'cook the bacon and cut up', 'slice up eggs', 'serve']
	  		}
	  	],

	  	Main: [
	  		{
	  			title: "Chicken Pot Pie",
	  			category: "main",
	  			ingredients: ['chicken', 'milk', 'pie crust', 'peas and carrots'],
	  			directions: ['roll', 'poach', 'boil', 'peel', 'bake', 'slice']
	  		}
	  	],

	  	Dessert: [
	  		{
	  			title: "Key Lime Pie",
	  			category: "dessert",
	  			ingredients: ['key limes', 'pie crust', 'egg whites'],
	  			directions: ['juice', 'whip', 'pour', 'set', 'fluff']
	  		}
	  	],

    
	}

// console.log(recipes.Appetizers);
var recipes = window.localStorage.getItem('myRecipeBox') === null ? initialData : 
	(JSON.parse(window.localStorage.getItem('myRecipeBox')) || []);

const recipeCateogries = Object.keys(recipes);




console.log(recipes);

class RecipeBox extends Component {
   
	constructor(props) {
		super(props);
		this.updateRecipeBox = this.updateRecipeBox.bind(this);
		this.editRecipeBox = this.editRecipeBox.bind(this);
		this.updateState = this.updateState.bind(this);
		
		this.state = {
			recipes
		}
		this.recipes = this.state;
	}

updateRecipeBox(name, category, ingredientsList, directionsList) {

	let newRecipe = {title: name, category: category, ingredients: ingredientsList, 
		directions: directionsList};
	
	
	this.state.recipes[category].push(newRecipe);
	window.localStorage.setItem('myRecipeBox', JSON.stringify(recipes));
	this.setState(this.state);
	
}

updateState(category, prevCat, index) {
	

	if (category !== prevCat) {
		
	 
		var prevCatKey = prevCat[0].toUpperCase() + prevCat.slice(1);
		var currCategoryKey = category[0].toUpperCase() + category.slice(1);
		

		var recipeToMove = JSON.parse(JSON.stringify(this.state.recipes[prevCatKey][index]));
		this.state.recipes[prevCatKey].splice(index, 1);
		 this.state.recipes[currCategoryKey].push(recipeToMove);

		this.setState(this.state);
		return true;	
	}
	window.localStorage.setItem('myRecipeBox', JSON.stringify(recipes));
	this.setState(this.state);
    
	

	
	
}
editRecipeBox(name,category,ingredients,directions, index, prevCat) {
	var cat = prevCat[0].toUpperCase() + prevCat.slice(1);
	
	
    let editedRecipe = this.state.recipes[cat][index];
    editedRecipe.category = category;
    editedRecipe.title = name;
    editedRecipe.ingredients = ingredients;
    editedRecipe.directions = directions;
   	this.updateState(category, prevCat, index);
    
    
}


 	

 render() {
    
    const recipes = this.state.recipes;
  return(
  	 
  	<div>
  	<Grid>
  		<Row className="header">
	  	 <Col xs={12} md={8}>
	     <h1>Recipe Box <small>A place to collect your favorie recipes</small></h1>
	     </Col>
	     <Col xs={6} md={4}>
	     	<AddRecipe updateRecipeBox={this.updateRecipeBox}/>
	     </Col>
	     </Row>
     </Grid>

    <Tabs defaultActiveKey={1} id="recipe-tabs">
        {
        	
        			
        			recipeCateogries.map(function(category, index) {
        				
        				
        				return (

        						<Tab eventKey={index} title={category} key={index} >
        							<Tabs defaultActiveKey={0} id="recipeCards">
        							   {
        							   	 recipes[category].map(function(card, index){
        							   	 	
        							   	 	return (
        							   	 		<Tab 
        							   	 			key={index} eventKey={index} title={card.title} 
        							   	 		>
        							   	 			
        							   	 			<Recipe 
        							   	 				title={card.title}
        							   	 				ingredients={card.ingredients}
        							   	 				directions={card.directions}
        							   	 				key={index}
        							   	 				id={index}
        							   	 				category={card.category}
        							   	 				editRecipe={this.editRecipeBox}
        							   	 				// recipes={this.state.recipes}
        							   	 			/>

        							   	 		</Tab>
        							   	 	);
        							   	 }, this)
        							   }
        							</Tabs>
        						</Tab>
        					);
        				
        			}, this)
        	
        }
    	
          
     </Tabs>
    
     
     	
    </div>
  )
 }

}

export default RecipeBox
