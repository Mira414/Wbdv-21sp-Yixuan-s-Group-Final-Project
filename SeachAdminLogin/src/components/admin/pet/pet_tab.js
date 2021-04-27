import React,{useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

import petService from "../../../services/admin-service/pet-service"
import PetDetail from "./pet-detail";
import NavBar from "../../nav-bar";
import sessionUserService from "../../../services/user-service";


const PetTab = ()=>{

    const {petId, userId} = useParams()
    const [pets, setPets] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    useEffect(()=>{
        console.log("petid= "+petId)
        sessionUserService.profile().then(user => {
            if(user !== null && user.username !== null){
                setCurrentUser(user)
                // userService.findUserById(userId).then(user => setUserName(user.username))
                // 从userlist跳转过来，查看某用户post的多个pets
                if(petId === "undefined" || typeof petId === "undefined") {
                    console.log("petId === undefined")
                    petService.findPetsForUser(userId).then(pets => setPets(pets))
                }
                // 从petlist点击某一pet名字之后跳转过来查看
                else{
                    petService.findPetById(petId).then(pet => {
                        console.log(JSON.stringify(pet))
                        setPets(new Array(pet))
                    })
                }
            }else{
                alert("Please login first")
            }
        })

    }, [])

    return <>
            <NavBar />
            {/*<h3>Reported Pet By <label className="font-italic font-weight-bold">{currentUser.username}</label></h3>*/}
            <h3>Reported Pet</h3>

            {/*<ul className="nav nav-tabs">*/}
            <div className="row">
                {
                    pets.map(pet=>
                        // <li className={`nav-item`} key={pet.petId}>
                            <PetDetail pet={pet} userId={userId}/>)
                        // </li>)
                }
                {/*{*/}
                {/*    currentUser.userType === "user" &&*/}
                {/*        <Link to={"/admin/pets"}>*/}
                {/*            <i className="btn btn-primary btn-block">Back to PetList</i>*/}
                {/*        </Link>*/}
                {/*}*/}
            {/*</ul>*/}
        </div>
        {
            currentUser.userType === "admin" && <div className="row">
            <Link to={"/admin/pets"} className="col">
                    <i className="btn btn-primary btn-block">Back to PetList</i>
                </Link>
            <Link to={"/admin/users"} className="col">
                    <i className="btn btn-primary btn-block">Back to UserList</i>
                </Link>
            </div>
        }
    </>
}

export default PetTab