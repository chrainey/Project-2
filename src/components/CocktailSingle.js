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