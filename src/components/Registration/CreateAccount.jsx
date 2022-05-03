import React from "react";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useEffect } from "react";

const CreateAccount = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneInputValue: "",
  });
  const [errors, setErrors] = useState({
    firstName: [],
    lastName: [],
    email: [],
    password: [],
    phoneInputValue: [],
  });
  const [dirty, setDirty] = useState([1, 1, 1, 1, 1]);
  const [message, setMessage] = useState("");
  const [displayErrors, setDisplayErrors] = useState(false);

  // validate
  const validate = () => {
    let errorsData = {};

    // firstName
    errorsData.firstName = [];
    if (!state.firstName) {
      errorsData.firstName.push("'First Name' is required");
    }
    // lastName
    errorsData.lastName = [];
    if (!state.lastName) {
      errorsData.lastName.push("'Last Name' is required");
    } else {
      errorsData.lastName = [];
    }

    // email
    errorsData.email = [];

    // email cannot be blank
    if (!state.email) {
      errorsData.email.push("'Email' is required");
    }

    // email regex
    const validEmailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (state.email) {
      if (!validEmailRegex.test(state.email)) {
        errorsData.email.push("Invalid Email");
      }
    }
    // password
    errorsData.password = [];

    // password cannot be blank
    if (!state.password) {
      errorsData.password.push("Password can't be blank");
    }

    // password regex
    const validPasswordRegex = /^\w{7,14}$/;
    if (state.password) {
      if (!validPasswordRegex.test(state.password)) {
        errorsData.password.push("Password must be 8-14 characters");
      }
    }
    // phone number
    errorsData.phoneInputValue = [];
    let input = state.phoneInputValue.replace(/\(|\)| |-/g, "").length
    if (!((input == 10) || (input == 0))) {
      errorsData.phoneInputValue.push(
        "improper phone number, should be 10 digits"
      );
    }

    setErrors(errorsData);

  };
  useEffect(validate, [state]);
  const checkErrorStatus = () => {
    var errorsArray = []
    var counter = 0
    for (let [key, value] of Object.entries(errors)) {
      if (value != '') {
        errorsArray.push(1)
        counter++
      } else {
        errorsArray.push(0)
      }
    }
    setDirty(errorsArray)

    console.log(counter, errorsArray)
    if (counter != 0) {
      return true
    } else
    return false
  }
  const handlePhoneInput = (e) => {
    // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setState({ ...state, phoneInputValue: formattedPhoneNumber });

    function formatPhoneNumber(value) {
      // if input value is falsy eg if the user deletes the input, then just return
      if (!value) return value;

      // clean the input for any non-digit values.
      const phoneNumber = value.replace(/[^\d]/g, "");

      // phoneNumberLength is used to know when to apply our formatting for the phone number
      const phoneNumberLength = phoneNumber.length;

      // we need to return the value with no formatting if its less then four digits
      // this is to avoid weird behavior that occurs if you  format the area code to early

      if (phoneNumberLength < 4) return phoneNumber;

      // if phoneNumberLength is greater than 4 and less the 7 we start to return
      // the formatted number
      if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      }

      // finally, if the phoneNumberLength is greater then seven, we add the last
      // bit of formatting and return it.
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6, 10)}`;
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setDisplayErrors(true);
      var Airtable = require("airtable");
      var base = new Airtable({ apiKey: "keyR8HVgxLpFwJudq" }).base(
        "appjkNhkhRINLuIln"
      );
      if (!checkErrorStatus()) {
        base("user-information").create(
        [
          {
            fields: {
              FirstName: state.firstName,
              LastName: state.lastName,
              Email: state.email.toLowerCase(),
              Password: state.password,
              Phone: state.phoneInputValue,
            },
          },
        ],
        function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          records.forEach(function (record) {
            console.log(record.getId());
          });
        }
      );
      }
  };
  return (
    <form className="create-account">
      <h4>Create Account</h4>
      <MDBRow className="mb-4">
        <MDBCol>
        <div className="text-danger">{(dirty[0] && displayErrors) ? errors.firstName:''}</div>
          <MDBInput
            id="form3Example1"
            label="First name"
            onChange={(e) => {
              setState({ ...state, firstName: e.target.value });
            }}
            value={state.firstName}
          />
        </MDBCol>
        <MDBCol>
        <div className="text-danger">{(dirty[1] && displayErrors) ? errors.lastName:''}</div>
          <MDBInput
            id="form3Example2"
            label="Last name"
            onChange={(e) => {
              setState({ ...state, lastName: e.target.value });
            }}
            value={state.lastName}
          />
        </MDBCol>
      </MDBRow>
      <div className="text-danger">{(dirty[2] && displayErrors) ? errors.email:''}</div>
      <MDBInput
        className="mb-4"
        type="email"
        id="form3Example3"
        label="email address"
        onChange={(e) => {
          setState({ ...state, email: e.target.value });
        }}
        value={state.email}
      />
      <div className="text-danger">{(dirty[3] && displayErrors) ? errors.password:''}</div>
      <MDBInput
        className="mb-4"
        type="password"
        id="form3Example4"
        label="Password"
        onChange={(e) => {
          setState({ ...state, password: e.target.value });
        }}
        value={state.password}
      />
      <div className="text-danger">{(dirty[4] && displayErrors) ? errors.phoneInputValue:''}</div>
      <MDBInput
        className="mb-4"
        type="tel"
        id="form3Example5"
        label="Phone # (optional)"
        placeholder="(123) 456-7890"
        onChange={(e) => {
          handlePhoneInput(e);
        }}
        value={state.phoneInputValue}
      />

      <MDBCheckbox
        wrapperClass="d-flex justify-content-center mb-4"
        id="form3Example6"
        label="Subscribe to my newsletter"
        defaultChecked
      />

      <MDBBtn onClick={onSubmit} type="submit" className="mb-4" block>
        Create Account
      </MDBBtn>
    </form>
  );
};

export default CreateAccount;
