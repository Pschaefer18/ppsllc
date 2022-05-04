import * as actionTypes from "../constants/action-types";

export const fetchPlants = () => async (dispatch, getState) => {
  var response = await fetch("https://api.airtable.com/v0/appKPZkZDJ7HSAs69/plants?view=Grid%20view&api_key=keyR8HVgxLpFwJudq", { method: "GET"});
  var responseData = await response.json();
  console.log(responseData);
  var plants = []
  await responseData.records.forEach((record) => {
    plants.push(record.fields)
  })
  console.log(plants)
  //dispatch response data to FETCH_TASKS action; it will be received by the reducer
  dispatch({
    type: actionTypes.FETCH_PLANTS,
    payload: plants
  });
};
