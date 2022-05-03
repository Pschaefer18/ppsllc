import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux"
import actions from "../../actions"

const NavBar = () => {
  let userInfo = useSelector(state => state.userInfo);
  let userCart = useSelector(state => state.cart);
  return (
    <Navbar bg="light" expand="lg">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Mansalva&display=swap" rel="stylesheet" />
      <Container fluid>
        <Navbar.Brand href="#" style={{fontFamily: "Mansalva", fontWeight: 600, fontSize:24}}>Paul's Plant Starts</Navbar.Brand>
        {!userInfo.id && (
          <Nav>
            <Nav.Link href="#/create">Create Account</Nav.Link>
          </Nav>
        )}
        {userInfo.id ? (
          <Nav>
            <Nav.Link href="#/">
              <div className="greeting">
                Hello {userInfo.FirstName},<br />
                <div>
                  <i className="fa fa-user"></i> Dashboard
                </div>
              </div>
            </Nav.Link>
          </Nav>
        ) : (
          <div>
            <Nav>
              <Nav.Link href="#/login">Login</Nav.Link>
            </Nav>
          </div>
        )}
        <Nav>
          <Nav.Link href="#/cart">
            {userCart && (
              <span
                className="fa-stack fa-2x has-badge"
                data-count={userCart.length}
              >
                <i className="fa fa-circle fa-stack-2x fa-inverse"></i>
                <i className="fa fa-shopping-cart fa-stack-2x red-cart"></i>
              </span>
            )}
          </Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls="navbarScroll">
          <i className="fa fa-bars"></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#/plants">Plants</Nav.Link>
            <Nav.Link href="#action3">Growing Info</Nav.Link>
            <Nav.Link href="#action4">About</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
