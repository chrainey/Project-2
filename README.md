# Cocktail Database API - GA Project 2

This is my second project for the Software Engineering Immersive course with GA. It’s a React app that’s been pair coded with my GA classmate Veronica De Ronzi in a 36-hour hackathon.

We decided quite quickly to use a cocktail and drinks API that can bring up cocktail recipes based on their ingredients. We thought that this would be fun and interesting for people using the app and, dare I say it, maybe useful.

The app has been deployed with Netlify [here](https://cocktail-library.netlify.app).

## Code Installation:

[GitHub Repository](https://github.com/chrainey/Project2-API/)

* Clone or download the above repo.
* Install yarn in Terminal by typing: yarn
* Start server with: yarn start

---

## Brief:

We were given the task of building an app in React that consumes and uses a public API. It must have several components and be deployed online. The app must have a router and several linked pages.

## Technologies Used:

* React
* React-Bootstrap
* Axios
* JavaScript
* SCSS
* API used: [The Cocktail DB](https://www.thecocktaildb.com/api.php/)

## Planning:

We moved quickly with our plan so it could be signed off quickly and we could get started, as we only had just over a day to complete the project.

We will have a home page on load that welcomes the user and asks them to select an ingredient from a pre-loaded drop down of drink ingredients. 

Once the user has selected an ingredient, they press the shake button that we will animate with a drinks themed GIF. Also on the homepage, we will have a navbar at the top that will remain in place no matter which page we are on. This navbar will contain a home button and a random cocktail button as there is an endpoint for this in the API so it should be quick and easy to implement.
The app will then direct the user to a results page bringing up all valid recipes. We will style these in a bootstrap card format that fits nicely on the screen and has the pictures prominent.
There will then be a link on each recipe card to see the recipe which will lead users to a single cocktail page that shows all of the ingredients, and other info.
We decided early on not to include all of the ingredients from the API in our drop-down. This is because some ingredients are in very few drinks and we want the user to have a decent amount of search results to look at. 
We took a look at numerous cocktails from the API and decided to use a list of 11 alcoholic spirits to populate our app.

Wireframe:

![Excalidraw Plan](/Project2-API/src/Images/Excalidraw.png)

## Build

We created an App.js file with React routes to the following components:

Home.js:

Landing page with a dropdown list for the user to choose a spirit, shaker button and a random button. The function produces a bootstrap styled landing page which populates the list and the buttons. 
When clicking the shaker button, the handleChange function activates storing the user’s choice using the ‘useState’ hook. 
A link is then created to the cocktailList.js component.
Another link is also activated by the user clicking the Random button. This links to the RandomDrink.js component.
```
const Home = () => {
  const [page, setPage] = useState('Vodka')

  const handleChange = (event) => {
    setPage(event.target.value)
  }

  return (
    <>
      <main className="hero text-center">
        <div className="hero-container">
          <h1 className='display-3'>Welcome to our Cocktail Library</h1>
          <p className='lead'>Please select your favourite Spirit to find a Cocktail</p>
          <select name="spirits" id="dropDown" onChange={handleChange}>
            <option value="Vodka" >Vodka</option>
            <option value="Gin">Gin</option>
            <option value="Tequila">Tequila</option>
            <option value="Dark rum">Dark Rum</option>
            <option value="Scotch">Scotch</option>
            <option value="Brandy">Brandy</option>
            <option value="Bourbon">Bourbon</option>
            <option value="Kahlua">Kahlua</option>
            <option value="Triple sec">Triple Sec</option>
            <option value="Sweet Vermouth">Sweet Vermouth</option>
            <option value="Amaretto">Amaretto</option>
          </select>
          <Link className='btn dark' to={`/cocktail/${page}`}><input type="image" src="https://media1.giphy.com/media/UK7bIbbuf6TbXIUtab/giphy.gif?cid=0165a076jormipls6kcaev04dfhkb5bhz2uzwa1msd3gs4w4&rid=giphy.gif&ct=s" /></Link>
          <Link to="/random" className='btn dark' id = "randbtn">RANDOM DRINK</Link>
        </div>
      </main>
    </>
  )
}
```
![Homepage Image](../Project2-API/src/Images/Homepage.png)

CocktailList.js:

This component uses the ‘useParams’ hook to get the name of the spirit. It then uses the Axios get method to the api endpoint that returns the list of cocktails containing the spirit.
We check if the returned object is not empty and then we display the list of cocktails. We use the map method to get the name and the picture of each cocktail. 
On each name and picture, we created a link to the CocktailSingle.js component.
Using Bootstraps ‘Container’, ‘Row’ and ‘Card’ classes we are able to produce a neat grid display of cards on the page with each card populated with the name of the spirit and its picture.
```
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const CocktailList = () => {
  const { spirit } = useParams()
  const [drinksList, setDrinksList] = useState()
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${spirit}`)
        data.drinks ? setDrinksList(data) : setErrors(true)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [spirit])

  return (
    <div className='list-wrapper'>
      <Container className='list-container'>
        <h1 className='text-center mb-4'>Drinks</h1>
        <Row> 
          { drinksList ? 
            <>
              { drinksList.drinks.map(item => {
                const { idDrink, strDrink, strDrinkThumb } = item
                console.log(item)
                return (
                  <Col key={idDrink} md="6" lg="4" className='mb-4'>
                    <Link key={idDrink} to={`/cocktail/${spirit}/${strDrink}`}>
                      <Card className='list-card'>
                        <p className='text-center'> { strDrink } </p>
                        <img src={strDrinkThumb} />
                      </Card>
                    </Link>
                  </Col>
                )
              }) }
            </> 
            :
            <h4 className="text-center">
              { errors ? 'Something went wrong. Check page details' : 'Loading...'}
            </h4> }
        </Row>
      </Container>
    </div>        
  )
}

export default CocktailList
```
![Cocktail List](../Project2-API/src/Images/cocktaillist.png)

CocktailSingle.js:

This component uses the ‘useParams’ hook to get the name of the cocktail. Then using the Axios get method again to the API endpoint, we get the details of the drink. We can then map the resulting objects to pick the information to be displayed on screen with name, image and recipe instructions.
We used another ‘useState’ hook to handle possible errors on the page on line 12. There are two possible errors: 1) the API request gives back an error code or 2) the API request is successful but returns an empty object (null)
```
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CocktailSingle = () => {
  const { name } = useParams()
  const [singleDrink, setSingleDrink] = useState(null)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        data.drinks ? setSingleDrink(data) : setErrors(true)
      }  catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [name])

  const getIngredientList = (item) => { 
    const ingredients = Object.keys( item ).filter(it => {
      return item[it] !== null && it.indexOf('strIngredient') !== -1
    }
    ) 
    return ingredients.map(it=>{
      return item[it]
    })
  }

  return (
    <div className='drinkCard'> 
      { singleDrink ? 
        <div className="text-center">
          { singleDrink.drinks.map(item => {
            const { idDrink, strDrink, strDrinkThumb, strInstructions } = item
            return (
              <Container className="text-center" key={idDrink}>
                <Row>
                  <Col md="6">
                    <img className="w-100" src={strDrinkThumb} />
                  </Col>
                  <Col md="6">
                    <h2>Name</h2>
                    <p> { strDrink } </p>
                    <hr />
                    <h2>Ingredients</h2>
                    <ul>
                      { getIngredientList(item).map(ingr =>{
                        return <li key={ingr}> {ingr} </li>
                      }) 
                      }
                    </ul>
                    <hr />
                    <h2>Recipe Instructions</h2>
                    <p> { strInstructions } </p>
                    <hr />
                  </Col>            
                </Row>
              </Container>
            )
          }) }
        </div> 
        : 
        <h4 className="text-center">
          { errors ? 'Something went wrong. Check page details' : 'Loading...'}
        </h4> }
    </div>
  )
}

export default CocktailSingle
```
![Single Cocktail image](../Project2-API/src/Images/cocktailimage.png)

RandomDrink.js

This component uses axios.get to the API endpoint that returns a random cocktail. From the random API we produce a single random cocktail card in the same format as CocktailSingle.js.
```
import { useEffect, useState } from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RandomDrink = () => {

  const [singleDrink, setSingleDrink] = useState(null)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        data.drinks ? setSingleDrink(data) : setErrors(true)
      }  catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [])

  const getIngredientList = (item) => { 
    const ingredients = Object.keys( item ).filter(it => {
      return item[it] !== null && it.indexOf('strIngredient') !== -1
    }
    ) 
    return ingredients.map(it=>{
      return item[it]
    })
  }

  return (
    <div className='drinkCard'> 
      { singleDrink ? 
        <div className="hero-container">
          { singleDrink.drinks.map(item => {
            const { idDrink, strDrink, strDrinkThumb, strInstructions } = item
            return (
              <Container className="text-center" key={idDrink}>
                <Row>
                  <Col md="6">
                    <img className='w-100' src={strDrinkThumb} />
                  </Col>
                  <Col md="6">
                    <h2>Name</h2>
                    <p> { strDrink } </p>
                    <hr />
                    <h2>Ingredients</h2>
                    <ul>
                      { getIngredientList(item).map(ingr =>{
                        return <li key={ingr}> {ingr} </li>
                      }) 
                      }
                    </ul>
                    <hr />
                    <h2>Recipe Intructions</h2>
                    <p> { strInstructions } </p>
                    <hr />
                  </Col>            
                </Row>
              </Container>
            )
          }) }
        </div> 
        : 
        <h4 className="text-center">
          { errors ? 'Something went wrong. Check page details' : 'Loading...'}
        </h4> }
    </div>
  )
}

export default RandomDrink
```
---

## Challenges:

We had an error on our drop-down menu. When the page was loading, the drop-down was populated with ‘Please Select’. If the user didn’t select a spirit and clicked the ‘shaker’ button, a 404 error would be produced.
This was fixed by having the state as Vodka on load. This meant ‘Please Select’ was no longer an option as it wasn’t on the list:

```
const Home = () => {
  const [page, setPage] = useState('Vodka')

  const handleChange = (event) => {
    setPage(event.target.value)
  }
```

We had a challenge with extracting the ingredients from the API returned object. We overcame this by using a filter method on the object keys returning those that are not ‘null’ and contain ‘strIngredient’ as a substring. The result of the first filter (const ingredients) contains only key-value pairs that passed the filter.
For example, the key part contains the substring ‘strIngredient’ and the value part is not null. Then the following ‘map’ method is needed to return the value part of the ingredients:
```
  const getIngredientList = (item) => { 
    const ingredients = Object.keys( item ).filter(it => {
      return item[it] !== null && it.indexOf('strIngredient') !== -1
    }
    ) 
    return ingredients.map(it=>{
      return item[it]
    })
  }
````

We couldn’t seem to get the blue underlines removed from the names of our cocktails when in a list. 
This was because in the code on line 39 the name is produced by using a link to another component. This produces html “a tags” but isn’t obvious to see:
```
return (
    <div className='list-wrapper'>
      <Container className='list-container'>
        <h1 className='text-center mb-4'>Drinks</h1>
        <Row> 
          { drinksList ? 
            <>
              { drinksList.drinks.map(item => {
                const { idDrink, strDrink, strDrinkThumb } = item
                console.log(item)
                return (
                  <Col key={idDrink} md="6" lg="4" className='mb-4'>
                    <Link key={idDrink} to={`/cocktail/${spirit}/${strDrink}`}>
                      <Card className='list-card'>
                        <p className='text-center'> { strDrink } </p>
                        <img src={strDrinkThumb} />
                      </Card>
                    </Link>
                  </Col>
                )
              }) }
            </> 
            :
```
Once we knew this, we could style the a tag with text-decoration: none.

## Wins:

I have learnt a lot more about styling in React using aids like bootstrap. However using bootstrap has made me realise how important it is to have styling in the back of your mind when getting bootstrap to create the HTML tags.

I think the visual look of the app is really professional. I like the colours we have used as they seem premium/luxury which ultimately is what cocktails are about. They are a premium drinking product nowadays, especially due to the way they look. We felt the app needed to portray this.

## Key Learnings and Takeaways:

Experience and confidence of using React

After building this project, I am a lot more confident with React. I find that with React you just need to ‘check things off’ a bit like a checklist. You need to remember to import and export properly, especially any hooks or props. At the start of the project we couldn’t work out why our bootstrap styles weren’t moving over to the local host and we soon realised that we hadn’t imported the bootstrap library.

Working in a pair:

I really enjoyed working with Veronica. Between us, we made decisions together quickly so we could crack on with getting the code sorted with plenty of time for everything else.
We also made sure to complete tasks individually and keep each other in the loop to avoid duplication of our work.

APIs:

I’m very interested in working more with APIs. Now I understand what they are, I can see how much they shape our daily internet lives as they can contain so much information. The next API project I would like to work on will probably be a sport API as it’s one of my passions and I’d like to see how much data is out there and how it is used.

## Future Improvements:

I would like to make the app more dynamic. For example with the styling, I could set colours and background images to variables that could be used by multiple scss files to make the app keep a consistent look.

We could find a way of using the API to display cocktails where we can specify two ingredients and find cocktails which contain both.

It would be quite handy to add the Random cocktail button to the navbar.





