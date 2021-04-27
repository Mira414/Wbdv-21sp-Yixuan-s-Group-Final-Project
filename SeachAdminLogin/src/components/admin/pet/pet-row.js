import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom";

import userService from "../../../services/admin-service/user-service"
// import petService from "../../../services/pet-service"

const PetRow = ({
                    pet,
                    deletePet
                })=>{

    const [userName, setUserName] = useState()

    useEffect(()=>{
        userService.findUserById(pet.userId).then(user=>setUserName(user.username))
    }, [])

    // const deletePet = (petId) => {
    //     console.log("delete " + pet.name)
    //     // petService.deletePet(petId)
    //     // .then(status => dispatch({
    //     //     type: "DELETE_PET",
    //     //     petToDelete: petId
    //     // }))
    // }

    return <>
        <tr>
            <td><Link to={`/users/${pet.userId}/pets/${pet.petId}`}>{pet.name}</Link></td>
            <td>{pet.breed}</td>
            <td>{pet.gender}</td>
            <td>{pet.age}</td>
            <td>{pet.status}</td>
            {/*<td><Link to={`/users/${pet.userId}`}>{userName}</Link></td>*/}
            <td>{userName}</td>
            <td><i className="fas fa-times float-right" onClick={()=>deletePet(pet.petId)}/></td>
        </tr>
    </>
}

export default PetRow