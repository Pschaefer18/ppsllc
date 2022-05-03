import React, { useState } from "react";
import HomePage from "./components/HomePage/HomePage";
import CreateAccount from "./components/Registration/CreateAccount";
import Login from "./components/Registration/Login";
import NavBar from "./components/NavBar/NavBar";
import Plants from "./components/Plants/Plants";
import Cart from "./components/Cart/Cart";
import PlantPage from "./components/PlantPage/PlantPage";
import { UserContext } from "./UserContext";
import { HashRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import store from "./store";
import { Provider } from "react-redux"
const App = () => {
  let [user, setUser] = useState({});
  return (
    <Provider store={store}>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<PlantPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default App;
