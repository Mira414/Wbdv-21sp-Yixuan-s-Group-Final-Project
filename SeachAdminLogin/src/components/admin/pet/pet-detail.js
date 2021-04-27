import React from "react";
import {Link} from "react-router-dom";

const PetDetail = ({pet, userId}) => {

    // const {userId, petId} =useParams()

    // const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    const defaultImg = "https://images.saymedia-content.com/.image/t_share/MTc0MjU0ODc2MjYyNDc1NjQ0/drawing-a-cartoon-dog.jpg"


    return <>
        <div className="col-6">
        <div className="card wm-card">
            <div className="card-body">
                <div className="row">
                    <img
                        alt="pet photo"
                        src={`${pet.image === "" ? defaultImg : pet.image}`}
                         width={`${pet.width==="null"? "250": pet.width}`}
                         width={`${pet.height===""? "200": pet.height}`}
                         // height={pet.height}
                        className="col-6"/>
                    <ul className="col-6 text-left">
                        <li>Name: {pet.name}</li>
                        <li>Breed: {pet.breed}</li>
                        <li>Gender: {pet.gender}</li>
                        <li>Age: {pet.age}</li>
                        <li>City: {pet.city}</li>
                        <li>State: {pet.state}</li>
                        <li>Zipcode: {pet.zipcode}</li>
                        <li>Status: {pet.status}</li>
                    </ul>
                </div>
            </div>
            <br />

            <div className="row wm-botton-margin">
                <div className="wm-auto-margin">
                   <Link to={`/users/${userId}/report/edit/pet/${pet.petId}`}>
                        <i className="btn btn-primary wm-icon">Edit</i>
                    </Link>
                    {/*<button type="submit" className="btn btn-primary wm-icon">Delete</button>*/}
                </div>
            </div>
        {/*</li>*/}
        </div>
        </div>
    </>
}

export default PetDetail