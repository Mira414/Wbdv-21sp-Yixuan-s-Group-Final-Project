import React, {useState, useEffect} from "react";
// import {Link} from "react-router-dom";
// import Popup from '../popup/password';
import { useHistory } from 'react-router-dom'

import userService from "../../services/user-service"
import NavBar from "../nav-bar";


const Register =({addUser, user}) => {
    // const [edited, setEdited] = useState(false);

    // added by Meng Wang
    const [changeUser, setChangeUser] = useState({
        username: "",
        password: "",
        userType: "user",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [userNameError, setUserNameError] = useState(false);
    const [userTypeError, setUserTypeError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rePasswordError, setRePasswordError] = useState({isNull : false, isWrong : false});
    const [isAdmin, setIsAdmin] = useState(false)
    // deleted by Meng Wang
    // const [submitted, setSubmitted] = useState(false);

    const history = useHistory()

    useEffect(() => {
        console.log("load register")
        userService.profile().then(user =>{
            console.log(JSON.stringify(user))
            if(user && user.userType === "admin"){
                console.log("some admin logged in")
                setIsAdmin(true)
            }else{
                console.log("normal user log in")
                setIsAdmin(false)
            }
        })

    }, [])

    // added by Meng Wang
    const register = () => {
        console.log("register")
        if(changeUser.username === null || changeUser.username === ""){
            setUserNameError(true)
        }
        if(changeUser.userType === null || changeUser.userType === ""){
            setUserTypeError(true)
        }
        if(isValidEmailAddress()){
            setEmailError(true)
        }
        if(changeUser.password === null || changeUser.password === ""){
            setPasswordError(true)
        }
        if(!userNameError && !userTypeError && !emailError && !passwordError){
            if(isAdmin){
                console.log("admin create new user")
                userService.createUserWithoutLogin(changeUser)
                    .then((user) => {
                        if(user.username === null){
                            alert("The username has been taken.")
                        }else {
                            console.log("create new user")
                            history.push("/admin/users")
                        }
                    })
            }else{
                console.log("user register")
                userService.register(changeUser)
                    .then((user) => {
                        console.log("register user: " + JSON.stringify(user))
                        if(user.username === null) {
                            alert("The username already been taken, please login directly or change to another username.")
                            // history.push("/login")
                        } else {
                                history.push("/profile")
                        }
                    }
                    )
            }
        }
    }

    const isValidEmailAddress= (val) => {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(val)) {
            return false;

        }
        return true;
    }


        return (
            <form>
                <NavBar />
                {
                    isAdmin && <h3>Create New User</h3>
                }
                {
                    !isAdmin && <h3>Sign up</h3>
                }
                {/*{JSON.stringify(changeUser)}*/}
                <div className="container-fluid">
                <div className="form-group row">
                    <label className="col-2">
                        <label className="text-danger">*</label>
                        User name
                    </label>
                    <input type="text" className="form-control col-10"
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
                           placeholder="User name" />
                </div>
                {
                    userNameError &&
                    <div className="alert alert-primary">User name is required!!</div>
                }
                <div className="form-group row">
                    <label className="col-2">
                        <label className="text-danger">*</label>
                        User type
                    </label>
                    <select className="form-control col-10" onChange={(e) =>
                        setChangeUser({
                            ...changeUser,
                            userType:e.target.value
                        })} value={changeUser.userType}>
                        {/*<option value={""}>Please select User Type</option>*/}
                        <option value={"user"}>User</option>
                        <option value={"admin"}>Admin</option>
                    </select>
                </div>
                {
                    userTypeError && !changeUser.userType &&
                    <div className="alert alert-primary">User type is required!!</div>
                }
                <div className="form-group row">
                    <label className="col-2">First name</label>
                    <input type="text" className="form-control col-10"
                           onChange={(e) =>
                               setChangeUser({
                                   ...changeUser,
                                   firstName:e.target.value
                               })}
                           placeholder="First name" />
                </div>

                <div className="form-group row">
                    <label className="col-2">Last name</label>
                    <input type="text" className="form-control col-10"
                           onChange={(e) =>
                               setChangeUser({
                                   ...changeUser,
                                   lastName:e.target.value
                               })}
                           placeholder="Last name" />
                </div>

                <div className="form-group row">
                    <label className="col-2">Email address</label>
                    <input type="email" className="form-control col-10"
                           onChange={(e) =>{
                               if(!isValidEmailAddress(changeUser.email)){
                                   setEmailError(true)
                               }else{
                                   setChangeUser({
                                       ...changeUser,
                                       email:e.target.value
                                   })
                                   setEmailError(false)
                               }
                               }
                           }
                           placeholder="Enter email" />
                </div>
                {
                    emailError &&
                    <div className="alert alert-primary">email address is invalid!!</div>
                }

                <div className="form-group row">
                    <label className="col-2">
                        <label className="text-danger">*</label>
                        Password
                    </label>
                    <input type="password" className="form-control col-10"
                           onBlur={(e) =>{
                               if(e.target.value) {
                                   setChangeUser({
                                       ...changeUser,
                                       password:e.target.value
                                   })
                                   setPasswordError(false)
                               }
                               else{
                                   setPasswordError(true)
                               }
                           }
                           }
                           onChange={()=>setPasswordError(false)}
                           placeholder="Enter password" />
                </div>
                {
                    passwordError &&
                    <div className="alert alert-primary">Password is required!!</div>
                }

                <div className="form-group row">
                    <label className="col-2">
                        <label className="text-danger">*</label>
                        Reenter Password
                    </label>
                    <input type="password" className="form-control col-10"
                           onBlur={(e) =>{
                               if(e.target.value) {
                                   setRePasswordError({...rePasswordError, isNull: false})
                                   if(e.target.value !== changeUser.password){
                                       setRePasswordError({...rePasswordError, isWrong: true})
                                   }else{
                                       setRePasswordError({...rePasswordError, isWrong: false})
                                   }
                               }
                               else{
                                   setRePasswordError({...rePasswordError, isNull: true})
                               }
                           }
                           }
                           onChange={()=>setRePasswordError({...rePasswordError, isNull: false})}
                           placeholder="Enter password" />
                </div>
                {
                    rePasswordError.isNull &&
                    <div className="alert alert-primary">The reentered password is required!!</div>
                }
                {
                    rePasswordError.isWrong &&
                    <div className="alert alert-primary">The reentered password should be same to the password.</div>
                }

                <i className="btn btn-primary btn-block"
                        // onClick={togglePopup}
                        onClick={() => {
                            // setSubmitted(true)
                            console.log("onclick sign up")
                            register()
                        }}>Sign Up
                </i>


                {/*{*/}
                {/*    (!changeUser.password || !changeUser.username || !changeUser.userType || !isValidEmailAddress(changeUser.email)) &&*/}
                {/*    <Link to="/register">*/}
                {/*        <button className="btn btn-primary btn-block"*/}
                {/*                // onClick={togglePopup}*/}
                {/*                onClick={() => {*/}
                {/*                    setSubmitted(true)*/}
                {/*                }}>Sign Up*/}
                {/*        </button>*/}
                {/*    </Link>*/}
                {/*}*/}

                {/*{*/}
                {/*    changeUser.username && changeUser.password && changeUser.userType && isValidEmailAddress(changeUser.email) &&*/}
                {/*    <Link to="/login">*/}
                {/*    <button className="btn btn-primary btn-block"*/}
                {/*            onClick={() => {*/}
                {/*                addUser(changeUser)*/}
                {/*            }}>Sign Up*/}
                {/*    </button>*/}
                {/*</Link>*/}
                {/*}*/}
                {/*<p className="forgot-password text-right">*/}

                {/*    <Link to="/login" passHref>*/}
                {/*        <a href="sign-in">The username has been registered, please login.</a>*/}
                {/*    </Link>*/}

                {/*    /!*<Link to={"/sign-in"}>Login</Link>*!/*/}
                {/*</p>*/}
                </div>
            </form>
        );
    }

export default Register
