import React, {useEffect, useState} from "react"
// import {Route} from "react-router-dom";
import NavBar from "../nav-bar";
// import UserList from "./user/user-list";
// import PetList from "./pet/pet-list";

import sessionUserService from "../../services/user-service"
import "./admin.css"
// import {Provider} from "react-redux";
// import {combineReducers, createStore} from "redux";
// import adminPetReducer from "../../reducer/admin-pet-reducer";
// import adminUserReducer from "../../reducer/admin-user-reducer";

const Admin = ()=>{

    const [loginOrNot, setLoginOrNot] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    useEffect(()=>{
        sessionUserService.profile().then(user=>{
            if(user !== null && user.username !== null){
                console.log(user.username + " has logged in")
                setLoginOrNot(true)
                setCurrentUser(user)
            }else{
                console.log("nobody has logged in")
                // alert("Please login first")
                setLoginOrNot(false)
            }
        })
    }, [])

    // const reducer = combineReducers({
    //     adminPetReducer,
    //     adminUserReducer : adminUserReducer
    // })
    //
    // const store = createStore(reducer)

    return <>
        <NavBar />
        {
            loginOrNot &&
            <>
                {
                    currentUser.userType === "admin" &&
                    <div>
                        <h3 className="wm-logo">Administration</h3>
                    </div>
                }
                {/*<UserList />*/}
                {/*<PetList />*/}
            </>
        }
        {
            !loginOrNot &&
            <h3>Please log in </h3>
        }
    </>
}

export default Admin