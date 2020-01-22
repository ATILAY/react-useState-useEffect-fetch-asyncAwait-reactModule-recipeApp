import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = ()=>{
  const APP_ID = '4be3b34a';
  const APP_KEY = 'e82c68364b5d4bd764671579a769cd1f';
  const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`; //temp literal for js and html mix

  // const [counter, setCounter] = useState(0);
  const [recipes, setRecipes] = useState([]);
  //create state for search
  const [search, setSearch] = useState('');
  //control fetching and useEffect methods calls
  const [query, setQuery] =  useState('chicken');


  // useEffect(()=>{
  //   console.log("Effect has been run");

  //   getRecipes();
  // }, [ /*Adding this array for just one effect issue->preventing refreshin the page everytime*/]); //useEf

  useEffect(()=>{
    console.log("Effect has been run");

    getRecipes();
  }, [query]); //useEf


  const getRecipes =  async () =>{
    const response =  await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
    console.log(setRecipes(data.hits));
    

  }//getR
const updateSearch = e => {
  setSearch(e.target.value);
  console.log("search::", search);
}//upda

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  //after searching and result  get rid of search text and make there clean
  setSearch('');

}//getS

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}>
        </input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {/* <h1 onClick={()=>{ setCounter( counter+1) }} >{counter}</h1> */}
      <div className="recipes">
      {recipes.map(recipe => (
        // paranthesis because I am gonna add some jsx html
        // this is why I did not use curly paranthesis
        <Recipe title={recipe.recipe.label} calories={recipe.recipe.calories} 
         image={recipe.recipe.image} key={recipe.recipe.label} ingredients={recipe.recipe.ingredients}   
        />
      ))}
      </div>
    </div>
  );
}//App

export default App;

//API ID: fa6fdf86     4be3b34a
//API key: 83c74dd3d52d4f1f5af6dbc83bbcbb39     e82c68364b5d4bd764671579a769cd1f	
//curl "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
