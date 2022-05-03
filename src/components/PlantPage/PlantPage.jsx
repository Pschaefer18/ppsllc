import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { render } from "@testing-library/react";
import actions from "../../actions";

const PlantPage = () => {
  const userCart = useSelector(state => state.cart);
  const userInfo = useSelector(state => state.userInfo)
  let dispatch = useDispatch()
  console.log(userCart);
  let { id } = useParams();
  let [product, setProduct] = useState({});
  let [qty, setQty] = useState(0);
  let [type, setType] = useState("Single");
  useEffect(() => {
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keyR8HVgxLpFwJudq" }).base(
      "appKPZkZDJ7HSAs69"
    );
    base("plants")
      .select({
        view: "Grid view",
        filterByFormula: `{id}=${id}`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            setProduct(record.fields);
          });
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }, []);
  const updateCart = (index, variation) => {
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keyR8HVgxLpFwJudq" }).base(
      "appjkNhkhRINLuIln"
    );
    base(`Master-Cart`).update(
      userCart[index].recId,
      {
        Qty: qty,
      },
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    var newArray = userCart;
    newArray[index] = { ...newArray[index], qty: qty, type: variation };
    return newArray;
  };
  const onAddToCart = () => {
    var typeString = type
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keyR8HVgxLpFwJudq" }).base(
      "appjkNhkhRINLuIln"
    );
    var productIndex = userCart.findIndex((object) => {
      return object.plant === product.plant && object.type === typeString;
    });
    if (productIndex === -1) {
      const mapPrice = (type) => {
        switch (type) {
          case "Single":
            return 3;
          case "four-pack":
            return 8;
          case "eight-pack":
            return 12;
            break;
          default:
            return "NaN";
        }
      };
      base(`Master-Cart`).create(
        [
          {
            fields: {
              id: userInfo.id,
              FirstName: userInfo.FirstName,
              LastName: userInfo.LastName,
              Product: product.plant,
              Type: typeString,
              Qty: qty,
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
              plant: product.plant,
              qty: qty,
              type: typeString,
              price: mapPrice(typeString),
              recId: record.getId(),
            }))
          });
        }
      );
    } else if (productIndex > -1 && qty === 0) {
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
      dispatch(actions.removeItemFromCart(productIndex))
    } else {
      dispatch(actions.addItemToCart(updateCart(productIndex, typeString)));
    }
  };
  const onPlusClick = () => {
    console.log(qty[type])
    var value = qty
    value.splice(type, 1, qty[type] + 1);
    console.log(value);
    setQty([...value])
  };
  const onMinusClick = () => {
    switch (type) {
      case 0:
        setQty({ ...qty, Single: qty[0] - 1 });
        break;
      case 1:
        setQty({ ...qty, fourPack: qty[1] - 1 });
        break;
      case 2:
        setQty({ ...qty, eightPack: qty[2] - 1 });
        break;
      default:
        setQty({ ...qty });
    }
  };
  const getPrice = (selectedType) => {
    var price = 0
    switch (selectedType) {
      case "Single":
        price = 3
        break;
      case "four-pack":
        price = 8
        break;
      case "eight-pack":
        price = 12
        break;
    }
    return price
  };
  return (
    <body className="plantPage">
      <Link to="/plants"><h2>Back To Plants</h2></Link>
      <div
        className="card mb-3"
        style={{
          width: "max-width: 540px",
          margin: "5% 25% 30% 25%",
        }}
      >
        <div className="row g-0">
          <div className="col-md-6">
            <img
              style={{ margin: "5%" }}
              src={product.image}
              alt="Trendy Pants and Shoes"
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <div style={{ width: "fit-content" }}>
                <h2 className="card-title">{product.plant} Start</h2>
                <h6
                  className="text-muted"
                  style={{
                    fontStyle: "italic",
                    float: "right",
                    fontSize: "90%",
                  }}
                >
                  {product.LatinName}
                </h6>
              </div>
              <br />
              <h6>Var: {product.Var}</h6>
              <div style={{ marginBottom: "1%" }}>
                Days to Maturity: {product.dtm}
              </div>
              <p className="card-text">{product.Description}</p>
              <p className="card-text">
                <Link to="/">
                  <small className="growing-info-link text-muted">
                    See Growing Information
                  </small>
                </Link>
              </p>
              <h6>
                Availability: Pre-Order (Available: {product.sellingBegins})
              </h6>
              <div style={{ display: "flex" }}>
                <h6>Quantity:</h6>
                <button
                  onClick={() => {(qty > 0) && setQty(qty - 1)}}
                  style={{
                    padding: "5px",
                    fontSize: "24px",
                    lineHeight: "0px",
                  }}
                  className="btn btn-primary"
                >
                  -
                </button>
                <span>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{
                    padding: "5px",
                    fontSize: "24px",
                    lineHeight: "0px",
                  }}
                  className="btn btn-primary"
                >
                  +
                </button>
                <div style={{ width: "22rem" }}>
                  <div id="select-wrapper-841361" className="select-wrapper">
                    <select
                      className="select select-initialized"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="Single">Single</option>
                      <option value="four-pack">Four Pack</option>
                      <option value="eight-pack">Eight Pack</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <h6>Price:</h6>
                <span>{`$${getPrice(type)}.00`}</span>
              </div>
              <div style={{ display: "flex", bottom: "5%" }}>
                <button
                  onClick={() => onAddToCart()}
                  style={{ position: "relative", marginRight: "10%" }}
                  type="button"
                  className="btn btn-primary"
                >
                  add to cart
                </button>
                <button
                  style={{ position: "relative" }}
                  type="button"
                  className="btn btn-primary"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};
export default PlantPage;
