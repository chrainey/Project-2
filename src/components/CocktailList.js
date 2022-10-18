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