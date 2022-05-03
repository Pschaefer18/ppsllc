import {addItemToCart, removeItemFromCart} from "./cart";
import {fetchPlants} from "./plants";
import {setUserInformation} from "./Info"

var actions = {addItemToCart, removeItemFromCart, fetchPlants, setUserInformation};
export default actions;