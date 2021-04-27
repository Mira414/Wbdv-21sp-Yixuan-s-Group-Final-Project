import React, {useEffect, useState} from "react"
import NavBar from "../../nav-bar";
import {Link, useHistory, useParams} from "react-router-dom";

import petService from "../../../services/admin-service/pet-service"
import sessionUserService from "../../../services/user-service"

const PetReport = () => {
    const {edit, petId, userId} = useParams();

    // const [cachedPet, setCachedPet] = useState({
    const [cachedPet, setCachedPet] = useState({
        // userId: userId,
        name: "",
        gender: "female",
        age: 0,
        breed: "",
        image: "",
        description: "",
        status: "missing",
        city: "",
        state: "",
        zipcode: ""
    })

    const newPet = {
        // userId: userId,
        name: "",
        gender: "female",
        age: 0,
        breed: "",
        image: "",
        description: "",
        status: "missing",
        city: "",
        state: "",
        zipcode: ""
    }

    const [currentUser, setCurrentUser] = useState({})
    const [showReportForm, setShowReportForm] = useState(false)
    const [petNameError, setPetNameError] = useState(false);
    const [breedError, setBreedError] = useState(false);
    const history = useHistory()


    useEffect(() => {
        sessionUserService.profile().then(user=>{
            if(user && user.username !== null){
                setCurrentUser(user)
                setShowReportForm(true)
                if(edit === "edit" && petId){
                    petService.findPetById(petId).then(pet=> setCachedPet(pet))
                }else if(edit === "report"){
                    setCachedPet( {
                        // userId: userId,
                        name: "",
                        gender: "female",
                        age: 0,
                        breed: "",
                        image: "",
                        description: "",
                        status: "missing",
                        city: "",
                        state: "",
                        zipcode: ""
                    })
                }
            }else {
                setShowReportForm(false)
            }
        })
    }, [])

    const update = ()=>{
        if(petNameError || breedError){
            alert("Pet Name and breed are required!")
        }else{
            console.log(currentUser.userId + " update " + petId + " =" + JSON.stringify(cachedPet))
            petService.updatePet(petId, cachedPet)
                .then(res => console.log(res))
            console.log("update")
            // if(currentUser.userType === "admin"){
                history.push("/admin/pets")
            // }else{
            //     history.push("/users/" + userId + "/pets")
            // }
        }
    }

    const post = ()=>{
        if(petNameError || breedError){
            alert("Pet Name and breed are required!")
        }else{
            console.log(currentUser.userId + " report new pet=" + JSON.stringify(cachedPet))
            petService.createPet(currentUser.userId, cachedPet)
                .then(res => console.log(res))
            // if(currentUser.userType === "admin"){
                history.push("/admin/pets")
            // }else{
            //     history.push("/users/" + userId + "/pets")
            // }
        }
    }

    return <div>
        <NavBar/>
        {
            edit === "edit" &&
                <h3>Edit Pet Infomation</h3>
        }
        {
            edit === "report" &&
            <h3>Report Missing Pet</h3>
        }
        {
            showReportForm &&
            <>
                <div className="container-fluid wm-auto-margin">
                    <div className="form-group row">
                        <label className="col-2">
                            <label className="text-danger">*</label>
                            Name</label>
                        <input
                            className="form-control col"
                            placeholder="Pet's name"
                            value={cachedPet.name}
                            onBlur={event => {
                                if(event.target.value){
                                    setPetNameError(false)
                                }else{
                                    setPetNameError(true)
                                }
                            }
                            }
                            onChange={event => setCachedPet({...cachedPet, name:event.target.value})}/>
                    </div>
                    {
                        petNameError &&
                        <div className="alert alert-primary">User name is required!!</div>
                    }
                    <div className="form-group row">
                        <label className="col-2">
                            <label className="text-danger">*</label>
                            Breed
                        </label>
                        <input
                            className="form-control col"
                            placeholder="Pet's breed"
                            value={cachedPet.breed}
                            onBlur={event => {
                                if(event.target.value){
                                    setBreedError(false)
                                }else {
                                    setBreedError(true)
                                }
                            }}
                            onChange={event => setCachedPet({...cachedPet, breed:event.target.value})}/>
                    </div>
                    {
                        breedError &&
                        <div className="alert alert-primary">Breed is required!!</div>
                    }
                    <div className="form-group row">
                        <label className="col-2">Gender</label>
                        <select className="form-control col" value={cachedPet.gender}
                                onChange={event => setCachedPet({...cachedPet, gender:event.target.value})}>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>
                    <div className="form-group row">
                        <label className="col-2">Age</label>
                        <input
                            type="number"
                            className="form-control col"
                            placeholder="Pet's age"
                            value={cachedPet.age}
                            onChange={event => setCachedPet({...cachedPet, age:event.target.value})}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-2">City</label>
                        <input
                            className="form-control col"
                            placeholder="Enter the city where the pet got lost"
                            value={cachedPet.city}
                            onChange={event => setCachedPet({...cachedPet, city:event.target.value})}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-2">State</label>
                        <input
                            className="form-control col"
                            placeholder="Enter the state where the pet got lost"
                            value={cachedPet.state}
                            onChange={event => setCachedPet({...cachedPet, state:event.target.value})}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-2">Zipcode</label>
                        <input
                            type="number"
                            className="form-control col"
                            placeholder="Enter the zipcode"
                            value={cachedPet.zipcode}
                            onChange={event => setCachedPet({...cachedPet, zipcode:event.target.value})}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-2">Status</label>
                        <select className="form-control col" value={cachedPet.status}
                                onChange={event => setCachedPet({...cachedPet, status:event.target.value})}>
                            <option value="missing">Missing</option>
                            <option value="found">Found</option>
                        </select>
                    </div>
                    <div className="form-group row">
                        <label className="col-2">Photo</label>
                        <input
                            className="form-control col"
                            placeholder="Provide the url of pet photo, start with 'http://'"
                            value={cachedPet.image}
                            onChange={event => setCachedPet({...cachedPet, image:event.target.value})}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-2">Description</label>
                        <textarea
                            className="form-control col"
                            form-group rows="5"
                            placeholder="describe pet's looking and character"
                            value={cachedPet.description}
                            onChange={event => setCachedPet({...cachedPet, description:event.target.value})}/>
                    </div>
                </div>
                <br />
                {
                    edit === "edit" &&
                    // <Link >
                        <i className="btn btn-primary" onClick={()=>update()}>Update</i>
                    // </Link>
                }
                {
                    edit === "report" &&
                    // <Link >
                        <i className="btn btn-primary" onClick={()=>post()}>Post</i>
                    // </Link>
                }
            </>
        }
        {
            !showReportForm && <h3>To post pet, you have to login.</h3>
        }
    </div>

}

export default PetReport