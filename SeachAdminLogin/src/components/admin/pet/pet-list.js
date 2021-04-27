import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import petService from "../../../services/admin-service/pet-service"
import sessionUserService from "../../../services/user-service"
import PetRow from "./pet-row";
// import userService from "../../../services/admin-service/user-service";
import {connect} from "react-redux";

// const PetList =({pets, findAllPets, findPetsForUser, deletePet})=>{
const PetList =({pets, findAllPets, findPetsForUser, deletePet, updatePet})=>{

    // const [pets, setPets] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    useEffect(()=>{
        sessionUserService.profile().then(user => {
            if(user !== null && user.username !== null){
                setCurrentUser(user)
                console.log("pet-list currentUser.username = " + currentUser.username)
                if(user.userType === "admin"){
                    console.log("admin view petlist ")
                    findAllPets()
                }else{
                    console.log(user.username + " view petlist ")
                    findPetsForUser(user.userId)
                    console.log(user.username + "'s petlist " + JSON.stringify(pets))
                }
            }else{
                alert("Please login first")
            }
        })
    }, [])


    return <div>
        <div className="nav nav-tabs wm-auto-margin">
            <div className="nav-item wm-nav-item">
                {
                    currentUser.userType === "admin" &&
                    <Link className="nav-link" to="/admin/users">User</Link>
                }
                <Link className="nav-link active" to="/admin/pets">
                    Pet
                </Link>
            </div>
            <Link to={`/users/${currentUser.userId}/report/report/pet`}>
                <i className="fas fa-plus wm-icon wm-floating-child">Post Pet</i>
            </Link>
            {/*<div className="wm-floating-child">*/}
            {/*    <input placeholder="search pets"/>*/}
            {/*    <i className="fas fa-search wm-icon"></i>*/}
            {/*    <i className="fas fa-plus wm-icon"></i>*/}
            {/*</div>*/}
        </div>

        <div className="wm-auto-margin">
            <table className="table table-striped wm-background">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th></th>
                    </tr>
                    </thead>
                <tbody>
                {
                    pets.map(pet=><PetRow pet={pet} deletePet={deletePet} key={pet.petId}/>)
                }
                </tbody>
            </table>
        </div>
    </div>
}

const stpm = (state) => {
    return {
        pets: state.adminPetReducer.pets
    }
}

const dtpm = (dispatch) =>{

    return {
        findAllPets : () =>
            petService.findAllPets()
                .then(allPets=>dispatch({type: "FIND_ALL_PETS", allPets})),
        findPetsForUser : (userId) =>
            petService.findPetsForUser(userId)
                .then(petsForUser => {
                    console.log("findPetsForUser" + JSON.stringify(petsForUser))
                    dispatch({type: "FIND_PETS_FOR_USER", petsForUser})
                }),
        deletePet : (delPetId)=> {
            console.log("delete pet = " + delPetId)
            petService.deletePet(delPetId).then(status => {
                    // console.log("deletePet:" + delPetId)
                    dispatch({type: "ADMIN_DELETE_PET", petIdToDelete: delPetId})
                }
            )
        },
        updatePet: (petId, pet) => {
            petService.updatePet(petId, pet)
                .then(status => dispatch({
                    type: "UPDATE_PET",
                    pet: pet
                }))
        },
    }
}

export default connect(stpm, dtpm)(PetList)