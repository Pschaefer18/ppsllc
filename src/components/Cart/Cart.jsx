import { useSelector } from "react-redux";
import CartRow from "../CartRow/CartRow";
const Cart = () => {
  let userCart = useSelector(state => state.cart)

  const sumPrices = () => {
    var total = 0;
    userCart.map((plant) => {
      total += plant.qty * plant.price;
    });
    return total;
  };

  return (
    <div>
      <div className="column cart">
        {userCart.length === 0 ? (
          <div>
            <h1>Your cart is empty</h1>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Qty</th>
                <th scope="col">Product</th>
                <th scope="col">Specification</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {userCart.map((plant, key) => (
                  <CartRow plant = {plant} id = {key}/>
              ))}
              <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <th>Total:</th>
                <td>${sumPrices()}.00</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="column"></div>
    </div>
  );
};

export default Cart;
