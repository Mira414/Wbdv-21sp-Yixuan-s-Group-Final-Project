import React, {useEffect, useState} from "react";
import UserRow from "./user-row";
import userService from "../../../services/admin-service/user-service";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const UserList =({
                    users,
                     findAllUsers,
                     deleteUser
})=>{

    // const [users, setUsers] = useState([]);

    useEffect(()=>{
        findAllUsers()

    },[])


    return <div>

        <div className="nav nav-tabs wm-auto-margin">
            <div className="nav-item wm-nav-item">
                {/*<a className="nav-link text-white"*/}
                <Link className="nav-link active" to="/admin/users">User</Link>
                <Link className="nav-link" to="/admin/pets">Pet</Link>
            </div>
            <Link to="/register">
                <i className="fas fa-plus wm-floating-child wm-icon"> Create User</i>
            </Link>
            {/*<div className="wm-floating-child">*/}
            {/*    <input placeholder="search users"/>*/}
            {/*    <i className="fas fa-search wm-icon"></i>*/}
            {/* </div>*/}
        </div>
        <div className="wm-auto-margin">
            <table className="table table-striped wm-background">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>UserType</th>
                    <th>Reported pets</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(user=><UserRow user={user} deleteUser = {deleteUser}/>)
                }
                </tbody>
            </table>
        </div>
    </div>
}

const stpm = (state) => {
    return {
        users: state.adminUserReducer.users
    }
}

const dtpm = (dispatch) =>{

    return {
        findAllUsers : () =>
            userService.findAllUsers()
                .then(users=>dispatch({type: "FIND_ALL_USERS", users})),
        deleteUser : (delUser)=> {
            console.log("delete user = " + delUser.userId)
            userService.deleteUser(delUser.userId).then(
                dispatch({type: "DELETE_USER", userIdToDelete: delUser.userId}),
            )

        }
    }
}

export default connect(stpm, dtpm)(UserList)