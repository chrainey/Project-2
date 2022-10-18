import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const PageNavbar = () => {
  return (
    <Navbar expand="sm">
      <Container as="section">
        <Navbar.Brand as={Link} to="/">🥂</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
  
export default PageNavbar