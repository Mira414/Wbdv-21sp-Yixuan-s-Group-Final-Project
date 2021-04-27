import React, {useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom";
import userService from "../services/user-service";

const NavBar = ()=>{
    const history = useHistory()

    const [loginOrNot, setLoginOrNot] = useState(false)
    const [userName, setUserName] = useState("")

    const logout = ()=>{
        userService.logout().then(()=>{
            history.push("/login")
            setLoginOrNot(false)
        })
    }

    useEffect(()=>{
        userService.profile().then(user=>{
            if(user === null || user.username === null){
                console.log("Navbar: no one log in.")
                setLoginOrNot(false)
            }else{
                console.log("Navbar: " + user.username + " has logged in.")
                setLoginOrNot(true)
                setUserName(user.username)
            }
        })
    },[])

    return <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
            <i className="fas fa-dog"></i>
            <Link to={`/home`}>
            <h2 className="navbar-brand">Welcome to Petfinder</h2>
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                  {
                      !loginOrNot &&
                      <>
                          <li className="nav-item">
                              <Link className="nav-link" to={"/login"}>Login</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to={"/register"}>Sign up</Link>
                          </li>
                      </>
                  }
                  {
                      loginOrNot &&
                          <>
                      <li className="nav-item">
                          <Link to={`/profile`} className="nav-link">
                          Hello, {userName}
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" onClick={logout}>
                              Logout
                          </Link>
                      </li>
                          </>
                  }
                  <li className="nav-item">
                      <Link className="nav-link" to={"/search"}>Search</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to={"/privacy"}>Privacy Policy</Link>
                  </li>

              </ul>
            </div>
        </div>
    </nav>
}

export default NavBar