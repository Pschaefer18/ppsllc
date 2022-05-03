import React from "react";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux"
import actions from "../../actions"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  let userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch()

  const onLoginClick = (event) => {
    event.preventDefault();
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keyR8HVgxLpFwJudq" }).base(
      "appjkNhkhRINLuIln"
    );
    console.log(`({Password} = '${password}')`);

    base("user-information")
      .select({
        filterByFormula: `AND({Email} = '${email}',{Password} = '${password}')`,
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.length > 0
            ? records.forEach(function (record) {
               console.log(record.fields);
                setMessage(
                  <span className="text-success">
                    Hello {record.fields.FirstName}
                  </span>
                );
                dispatch(actions.setUserInformation({
                  id: record.fields.id,
                  FirstName: record.fields.FirstName,
                  LastName: record.fields.LastName,
                  Email: record.fields.Email,
                  Password: record.fields.Password,
                  Phone: record.fields.Phone,
                  DateCreated: record.fields.DateCreated
                }))
                base(`Master-Cart`)
                  .select({
                    filterByFormula: `{id} = ${record.fields.id}`,
                    view: "Grid view",
                  })
                  .eachPage(
                    function page(records, fetchNextPage) {
                      if (records.length > 0) {
                        var currentCart = [];
                        records.forEach(function (rec) {
                          console.log(record);
                          currentCart.push({
                            plant: rec.fields.Product,
                            qty: rec.fields.Qty,
                            type: rec.fields.Type,
                            price: rec.fields.Price,
                            recId: rec.getId(),
                          });
                        });
                      }
                    },
                    function done(err) {
                      if (err) {
                        console.error(err);
                        return;
                      }
                    }
                  );
              })
            : setMessage(<span className="text-danger">Incorrect Login</span>);

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  };
  return (
    <form className="create-account">
      <h4>Login</h4>
      <MDBInput
        className="mb-4"
        type="email"
        id="form1Example1"
        label="Email address"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <MDBInput
        className="mb-4"
        type="password"
        id="form1Example2"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <MDBRow className="mb-4">
        <MDBCol className="d-flex justify-content-center">
          <MDBCheckbox id="form1Example3" label="Remember me" defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href="#!">Forgot password?</a>
        </MDBCol>
      </MDBRow>
      {message}

      <MDBBtn onClick={onLoginClick} type="submit" block>
        Sign in
      </MDBBtn>
    </form>
  );
};

export default Login;
