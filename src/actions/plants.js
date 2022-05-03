import * as actionTypes from "../constants/action-types";

export const fetchPlants = () => (dispatch, getState) => {
var plantsArray = []
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyR8HVgxLpFwJudq'}).base('appKPZkZDJ7HSAs69');

base('plants').select({
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        plantsArray.push(record.fields)
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
  dispatch({
          type: actionTypes.FETCH_PLANTS,
          payload: plantsArray
      })
  }