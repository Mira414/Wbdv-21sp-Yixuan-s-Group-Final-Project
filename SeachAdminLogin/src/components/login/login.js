import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom";

import userService from "../../services/user-service"
import NavBar from "../nav-bar";
// import Profile from "./profile";
// import Popup from '../../components/popup/password';

// const newUser = {}
// export default newUser

const Login = ({findUserForUsername, users, updateUser, user}) => {

    const [submitted, setSubmitted] = useState(false);
    const [changeUser, setChangeUser] = useState({username:"", password:""});
    const [isOpen, setIsOpen] = useState(false);

    //added by Meng Wang
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState({"isNull": false, "isWrong": false});
    const history = useHistory()

    //added by Meng Wang
    const login = () => {
        if(!changeUser.password || !changeUser.username ||changeUser.password !== user.password) {
            userService.login(changeUser)
                .then((user) => {
                    console.log("user login: " + JSON.stringify(user))
                    if (user.username === null) {
                        alert("Please check your username or password.")
                    } else {
                        if (user.userType === "admin") {
                            history.push("/admin/users")
                        } else {
                            history.push("/profile")
                        }
                    }
                })
        }else{
            setSubmitted(true)
        }
    }

        return (
            <form>
                <NavBar />
                <h3>Login</h3>
                {/*{JSON.stringify(user)}*/}
                {/*{JSON.stringify(changeUser)}*/}
                <div className="form-group">
                    <label>Username</label>

                    <input className="form-control"
                           onBlur={(e) =>{
                               if(e.target.value) {
                                   setChangeUser({
                                       ...changeUser,
                                       username:e.target.value
                                   })
                                   setUserNameError(false)
                               }
                               else{
                                   setUserNameError(true)
                               }
                           }
                           }
                           onChange={()=>setUserNameError(false)}
                           // onClick={() => {
                           //     findUserForUsername(changeUser)
                           // }}
                           placeholder="Enter username" />
                </div>
                {
                    userNameError &&
                    <div className="alert alert-primary">User name is required!!</div>
                }


                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password" value={changeUser.password} className="form-control"
                           onBlur={(e) =>{
                               if(e.target.value) {
                                   setPasswordError({...passwordError, isNull: false})
                               }
                               else{
                                   setPasswordError({...passwordError, isNull: true})
                               }
                           }}
                           onChange={(e) =>{
                               setChangeUser({
                                   ...changeUser,
                                   password:e.target.value
                              })}}
                           placeholder="Enter password" />


                    {
                        passwordError.isWrong &&
                        // submitted && changeUser.password !== user.password &&
                        <div className="alert alert-primary">Password is not correct!!</div>

                    }
                    {
                        passwordError.isNull &&
                        // submitted && !changeUser.password &&
                        <div className="alert alert-primary">Password is required!!</div>
                    }
                </div>


                <Link to={`/login`}>
                    <i className="btn btn-primary btn-block"
                            onClick={() => {login()}}>
                        Login
                    </i>
                </Link>
                {/*======================================*/}
                {/*Rae之前的代码*/}
                {/*{*/}
                {/*    (!changeUser.password || !changeUser.username ||changeUser.password !== user.password) &&*/}
                {/*    <>*/}
                {/*    <Link to={`/login`}>*/}
                {/*        <button className="btn btn-primary btn-block"*/}

                {/*                onClick={() => {*/}
                {/*                    setSubmitted(true)*/}
                {/*                }}*/}
                {/*        >Login*/}
                {/*        </button>*/}
                {/*    </Link>*/}
                {/*    </>*/}
                {/*}*/}
                {/*====================end=================*/}
                {/*{*/}
                {/*    changeUser.password  && changeUser.password !== user.password &&*/}
                {/*    <>*/}
                {/*    <Link to={`/login`}>*/}
                {/*        <button className="btn btn-primary btn-block"*/}
                {/*                onClick={() => {*/}
                {/*                    setSubmitted(true)*/}
                {/*                }}*/}
                {/*        >Sign In*/}
                {/*        </button>*/}
                {/*    </Link>*/}
                {/*    </>*/}
                {/*}*/}

                {/*======================================*/}
                {/*Rae之前的代码*/}
                {/*{*/}
                {/*    changeUser.password  && changeUser.username &&  changeUser.password === user.password &&*/}
                {/*    <>*/}
                {/*    <Link to={`/profile/${user.userId}`}>*/}
                {/*        <button className="btn btn-primary btn-block"*/}
                {/*                onClick={() => {*/}
                {/*                    setSubmitted(true)*/}

                {/*                }}*/}
                {/*        >Login*/}
                {/*        </button>*/}
                {/*    </Link>*/}
                {/*    </>*/}
                {/*}*/}
                <Link to="/reset" passHref>
                    <a className="forgot-password text-right">Forgot password?</a>
                </Link>

            </form>
        );
    }



export default Login

