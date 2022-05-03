import { useSelector, useDispatch } from "react-redux";
import actions from "../../actions"
const CartRow = ({plant, id}) => {
    let userCart = useSelector(state => state.cart)
    let dispatch = useDispatch()
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keyR8HVgxLpFwJudq" }).base(
      "appjkNhkhRINLuIln"
    )
    const removeItem = () => {
        alert("Remove this item?")
        base(`Master-Cart`).destroy(
            userCart[id].recId,
            function (err, deletedRecord) {
              if (err) {
                console.error(err);
                return;
              }
              console.log("Deleted record", deletedRecord.id);
            }
          )
        dispatch(actions.removeItemFromCart(userCart[id].recId))
      }
  return (
    <tr>
      <td>
        <button
          style={{ paddingLeft: "15px", paddingRight: "15px" }}
          type="button"
          className="btn btn-danger"
          onClick={() => removeItem()}
        >
          x
        </button>
      </td>
      <td>{plant.qty}</td>
      <td>{plant.plant}</td>
      <td>{plant.type}</td>
      <td>${plant.price}.00</td>
      <td>${plant.qty * plant.price}.00</td>
    </tr>
  );
};
export default CartRow;
