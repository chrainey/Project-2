import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'




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

export default Home