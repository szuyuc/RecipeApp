import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';


const App = () => {

  const APP_ID = ''
  const APP_KEY = ''
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  // useEffect rerender our page but you can set it to run once based on the condition(value changes)
  // useEffect(()=>{ console.log('effect running');},[]); //arr is for when to set it run 

  useEffect(() => { getrecipes(); }, [query]);

  // any external request you need to add async, because you dont know when the data coming back
  const getrecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    //console.log(data);
    setRecipes(data.hits);
    console.log(data.hits);
  }

  // add event on it: everytime you trigger onChange you will get the event
  const updateSearch = e => {
    setSearch(e.target.value); // whatever you type into the input, the state changes
    //console.log(search)
  }

  const getSearch = e => {
    //stop the page refresh
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  // onchanges: input changes, it's going to run
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit"> search</button>
      </form>
      {recipes.map(recipe => (<Recipe
        title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} key={recipe.recipe.label} ingredients={recipe.recipe.ingredients} />))}
    </div>
  );

}

export default App;
