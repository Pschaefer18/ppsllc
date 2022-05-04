import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../actions";
import PlantCard from "../PlantCard/PlantCard";
import { prototype } from "airtable/lib/airtable_error";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Form, FormControl, Button } from "react-bootstrap";

function Plants() {
  //state
  let [selectedCategory, setSelectedCategory] = useState("view all");
  let [cart, setCart] = useState({});
  let [categories, setCategories] = useState(["view all"]);

  //create dispatch function
  let dispatch = useDispatch();

  //run on first render
  useEffect(() => {
    dispatch(actions.fetchPlants())
  }, [dispatch]);

  let plants = useSelector(state => state.plants)

  return (
    <div className="plants">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@900&display=swap"
        rel="stylesheet"
      />
      <div className="plants-heading">
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "8vh",
          }}
        >
          Plants
        </h1>
        <div className="filters">
          <MDBDropdown className="btn-group" style={{ marginRight: "5%" }}>
            <div className="category-selection">Category:</div>
            {selectedCategory ? (
              <MDBDropdownToggle split>{selectedCategory}</MDBDropdownToggle>
            ) : (
              <MDBDropdownToggle split>All</MDBDropdownToggle>
            )}
            <MDBDropdownMenu>
              {categories.map(
                (cat, key) =>
                  cat != selectedCategory && (
                    <MDBDropdownItem key={key}>
                      <MDBBtn
                        onClick={() => setSelectedCategory(cat)}
                        style={{ width: "100%" }}
                        color="white"
                      >
                        {cat}
                      </MDBBtn>
                    </MDBDropdownItem>
                  )
              )}
            </MDBDropdownMenu>
          </MDBDropdown>
          <Form className="d-flex" style={{ marginLeft: "5%" }}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button>Search</Button>
          </Form>
        </div>
      </div>
      <div className="plants-grid">
        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
          {plants && plants.map((plant) => (
            <div key={plant.id} className="plant-card">
              {plant.status === "Sold Out" && <h3>Sold Out</h3>}
              {plant.status === "Pre-Order" && (
                <h3
                  style={{
                    fontSize: 28,
                    fontFamily: "Titillium Web",
                    fontWeight: 900,
                    color: "white",
                  }}
                >
                  Pre-Order
                </h3>
              )}
              {plant.status === "In Stock" && (
                <h3
                  style={{
                    fontSize: 28,
                    fontFamily: "Titillium Web",
                    fontWeight: 900,
                    color: "white",
                  }}
                  className="text-success"
                >
                  Available Now
                </h3>
              )}
              <PlantCard key={plant.id} plant={plant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Plants;
