// import logo from './logo.svg';
import React, {createContext, useEffect, useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import {BrowserRouter, Route, Link, useHistory} from "react-router-dom";
import UserManagement from "./components/user-management"
import PetListMainPage from "./components/table/pet-list-main-page";
import PetCardMainPage from "./components/grid/pet-card-main-page"
import { LastLocationProvider } from 'react-router-last-location';


import SearchScreen from "./components/search/search-screen";
import DetailsScreen from "./components/search/details-screen";
import Home from "./components/home";
import DogCatSearch from "./components/search/dogcat-search"
import Privacy from "./components/privacy"

// import api from "./api/oauth-token"
import userService from "./services/user-service"
import Admin from "./components/admin/admin";
import PetTab from "./components/admin/pet/pet_tab";
import PetReport from "./components/admin/pet/pet-report";
import UserDetail from "./components/admin/user/user_detail";
import UserList from "./components/admin/user/user-list";
import PetList from "./components/admin/pet/pet-list";
import {combineReducers, createStore} from "redux";
import adminPetReducer from "./reducer/admin-pet-reducer";
import adminUserReducer from "./reducer/admin-user-reducer";
import {Provider} from "react-redux";

export const AuthContext = createContext();
const petFinderKey = "IERoPwTvvsgAtqgT71P7EhCx8nLMCsx4xvvP0zywOA6eSzWWal"
const petFinderSecret = "InqFifeZbO9QOwtLXTDQROwrzovrIbF2YfKVVl0o"

const reducer = combineReducers({
    adminPetReducer,
    adminUserReducer : adminUserReducer
})

const store = createStore(reducer)

//modified by Meng Wang
// function App() {
const App = () => {
//=====end=====

    return (

            <BrowserRouter>
            <LastLocationProvider>
            <div className="App">
            <div className="container-fluid">
            {/*<nav className="navbar navbar-expand-lg navbar-light fixed-top">*/}
            {/*/!*<div className="container-fluid">*!/*/}
            {/*  <i className="fas fa-dog"></i>*/}
            {/*    <Link to={`/`}>*/}
            {/*  <h2 className="navbar-brand">Welcome to Petfinder</h2>*/}
            {/*    </Link>*/}
                {/*=========deleted by Meng Wang================*/}
              {/*<div className="collapse navbar-collapse" id="navbarTogglerDemo02">*/}
              {/*  <ul className="navbar-nav ml-auto">*/}
              {/*      {*/}
              {/*          !loginOrNot &&*/}
              {/*        <li className="nav-item">*/}
              {/*          <Link className="nav-link" to={"/login"}>Login</Link>*/}
              {/*        </li>*/}
              {/*      }*/}
              {/*      {*/}
              {/*          loginOrNot &&*/}
              {/*      <li className="nav-item">*/}
              {/*          <Link className="nav-link" onClick={logout}>*/}
              {/*              Logout*/}
              {/*          </Link>*/}
              {/*    </li>*/}
              {/*      }*/}
              {/*    <li className="nav-item">*/}
              {/*      <Link className="nav-link" to={"/register"}>Sign up</Link>*/}
              {/*    </li>*/}
              {/*      <li className="nav-item">*/}
              {/*          <Link className="nav-link" to={"/privacy"}>Privacy Policy</Link>*/}
              {/*      </li>*/}

              {/*  </ul>*/}
              {/*</div>*/}
                {/*=========end================*/}
            {/*</div>*/}
          {/*</nav>*/}

          <div className="auth-wrapper">
            <div className="auth-inner">

                {/*<Route path="/usermanage" exact={true}>*/}
                {/*    <UserManagement/>*/}

                {/*</Route>*/}
                <Provider store={store}>
              <Route path="/">
                  <UserManagement/>
              </Route>
              <Route path={["/petlist/:userId"]} exact={true}>
                <PetListMainPage/>
              </Route>
                <Route path="/petlist/post/card/:petId" exact={true}>
                    <PetCardMainPage/>
                </Route>
                    <Route path="/home" exact={true}>
                        <Home/>
                    </Route>
                    <Route path={["/search"]}
                           exact={true}>
                        <DogCatSearch/>
                    </Route>

                    <Route path={["/search/:type/:breed"]}
                           exact={true}>
                        <SearchScreen/>
                    </Route>
                    <Route path="/details/:type/:id" exact={true}>
                        <DetailsScreen/>
                    </Route>
                    <Route path="/privacy" exact={true}>
                        <Privacy/>
                    </Route>
                {/*========added by Meng Wang=======*/}
                {/*这里的label是为了区分显示user list和pet list*/}
                <Route
                    path={["/admin", "/admin/:label"]}
                    exact={true}
                    component={Admin}>
                </Route>
                <Route path="/admin/users" exact={true} component = {UserList}>
                    {/*<UserList />*/}
                </Route>
                <Route path="/admin/pets" exact={true} component = {PetList}>
                    {/*<PetList />*/}
                </Route>

                <Route
                    path={["/users/:userId/pets", "/users/:userId/pets/:petId"]}
                    exact={true}
                    component={PetTab}>
                </Route>
                <Route
                    path={ ["/users/:userId/report/:edit/pet", "/users/:userId/report/:edit/pet/:petId"]}
                    exact={true}
                    component={PetReport}>
                </Route>
                <Route
                    path={["/users/:userId"]}
                    exact={true}
                    component={UserDetail}>
                </Route>
                </Provider>
                {/*========end=======*/}
            </div>
          </div>



        </div>

        </div>
            </LastLocationProvider>
        </BrowserRouter>

  );
}


export default App;
