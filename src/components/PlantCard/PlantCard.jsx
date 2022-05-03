import React from "react";
import { MDBCol } from "mdb-react-ui-kit";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import actions from "../../actions"
import Plants from "../Plants/Plants";

const PlantCard = ({ plant }) => {
  let userCart = useSelector(state => state.cart)
  let userInfo = useSelector(state => state.userInfo)
  let dispatch = useDispatch()
  var [singles, setSingles] = useState(0);
  var [fourPacks, setFourPacks] = useState(0);
  var [eightPacks, setEightPacks] = useState(0);
  const [allowLink, setAllowLink] = useState(true);
  useEffect(() => {
    if (userCart && userCart.length > 0) {
      if (
        userCart.findIndex((object) => {
          return object.plant === plant.plant && object.type === "Single";
        }) != -1
      ) {
        setSingles(
          userCart[
            userCart.findIndex((object) => {
              return object.plant === plant.plant && object.type === "Single";
            })
          ].qty
        );
      }
      if (
        userCart.findIndex((object) => {
          return object.plant === plant.plant && object.type === "four-pack";
        }) != -1
      ) {
        setFourPacks(
          userCart[
            userCart.findIndex((object) => {
              return (
                object.plant === plant.plant && object.type === "four-pack"
              );
            })
          ].qty
        );
      }
      if (
        userCart.findIndex((object) => {
          return object.plant === plant.plant && object.type === "eight-pack";
        }) != -1
      ) {
        setEightPacks(
          userCart[
            userCart.findIndex((object) => {
              return (
                object.plant === plant.plant && object.type === "eight-pack"
              );
            })
          ].qty
        );
      }
    }
  }, []);
  const updateCart = (oldArray, number, index, variation) => {
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keyR8HVgxLpFwJudq" }).base(
      "appjkNhkhRINLuIln"
    );
    base(`Master-Cart`).update(
      userCart[index].recId,
      {
        Qty: number,
      },
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    var newArray = oldArray;
    newArray[index] = { ...newArray[index], qty: number, type: variation };
    return newArray;
  };
  const setProductInCart = (number, type, typeString, stateFunction) => {
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keyR8HVgxLpFwJudq" }).base(
      "appjkNhkhRINLuIln"
    );
    var productIndex = userCart.findIndex((object) => {
      return object.plant === plant.plant && object.type === typeString;
    });
    if (productIndex > -1) {
      stateFunction(number);
    }
    if (type === 0) {
      const mapPrice = (type) => {
        switch (type) {
          case "Single":
            return 3;
          case "four-pack":
            return 5;
          case "eight-pack":
            return 8;
            break;
          default:
            return "NaN";
        }
      };
      stateFunction(number);
      base(`Master-Cart`).create(
        [
          {
            fields: {
              id: userInfo.id,
              FirstName: userInfo.FirstName,
              LastName: userInfo.LastName,
              Product: plant.plant,
              Type: typeString,
              Qty: number,
              Price: mapPrice(typeString),
              status: "In Cart",
            },
          },
        ],
        function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          records.forEach(function (record) {
            dispatch(actions.addItemToCart({
              plant: plant.plant,
              qty: number,
              type: typeString,
              price: mapPrice(typeString),
              recId: record.getId(),
            }))
          });
        }
      );
    } else if (type === 1 && number === 0) {
      base(`Master-Cart`).destroy(
        userCart[productIndex].recId,
        function (err, deletedRecord) {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Deleted record", deletedRecord.id);
        }
      );
      dispatch(actions.removeItemFromCart(userCart[productIndex].recId));
    } else {
      if (productIndex > -1) {
        dispatch.addItemToCart(updateCart(userCart, number, productIndex, typeString))
      }
    }
  };

  return (
    <div className="col">
      <Link to={allowLink && ("/product/" + plant.id)}>
        <div className="card bg-dark text-white">
          <img src={plant.image} className="card-img" alt="Stony Beach" />
          <div className="card-img-overlay">
            <h5 className="plant-title">
              {plant.plant}
              {plant.status === "Pre-Order" && (
                <h6>Available {plant.sellingBegins}</h6>
              )}
            </h5>
            {plant.status === "Sold Out" ? null : (
              <div onMouseOver={() => setAllowLink(false)} onMouseOut={() => setAllowLink(true)} className="specification">
                <ul className="list-group">
                  {(plant.status === "Pre-Order") |
                  (plant.status === "In Stock" && plant.singles > 0) ? (
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Singles
                      <span
                        className="badge rounded-pill"
                        style={
                          singles ? { display: "block" } : { display: "none" }
                        }
                      >
                        {singles}
                      </span>
                      <button
                        className="btn plus"
                        onClick={() => {
                          setProductInCart(
                            singles + 1,
                            singles,
                            "Single",
                            setSingles
                          )
                        }
                        }
                      >
                        +
                      </button>
                      <button
                        className="btn minus"
                        onClick={() =>
                          singles > 0 &&
                          setProductInCart(
                            singles - 1,
                            singles,
                            "Single",
                            setSingles
                          )
                        }
                      >
                        -
                      </button>
                    </li>
                  ) : null}
                  {(plant.status === "Pre-Order") |
                  (plant.status === "In Stock" && plant.fourPacks) ? (
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      4-Packs
                      <span
                        className="badge rounded-pill"
                        style={
                          fourPacks ? { display: "block" } : { display: "none" }
                        }
                      >
                        {fourPacks}
                      </span>
                      <button
                        className="btn plus"
                        onClick={() =>
                          setProductInCart(
                            fourPacks + 1,
                            fourPacks,
                            "four-pack",
                            setFourPacks
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        className="btn minus"
                        onClick={() =>
                          fourPacks > 0 &&
                          setProductInCart(
                            fourPacks - 1,
                            fourPacks,
                            "four-pack",
                            setFourPacks
                          )
                        }
                      >
                        -
                      </button>
                    </li>
                  ) : null}
                  {(plant.status === "Pre-Order") |
                  (plant.status === "In Stock" && plant.eightPacks) ? (
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      8-Packs
                      <span
                        className="badge rounded-pill"
                        style={
                          eightPacks
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        {eightPacks}
                      </span>
                      <button
                        className="btn plus"
                        onClick={() =>
                          setProductInCart(
                            eightPacks + 1,
                            eightPacks,
                            "eight-pack",
                            setEightPacks
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        className="btn minus"
                        onClick={() =>
                          eightPacks > 0 &&
                          setProductInCart(
                            eightPacks - 1,
                            eightPacks,
                            "eight-pack",
                            setEightPacks
                          )
                        }
                      >
                        -
                      </button>
                    </li>
                  ) : null}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlantCard;
