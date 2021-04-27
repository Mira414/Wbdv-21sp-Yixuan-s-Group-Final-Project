// <<<<<<< HEAD
// const PET_URL="https://petfinderserver.herokuapp.com/api"
const PET_URL=process.env.REACT_APP_PET_URL
// =======
// const PET_URL="https://petfinderserver2.herokuapp.com/api"
// >>>>>>> 540f506ba4b6e8f62a29b143bd175e2b361f2089
// const PET_URL = "http://localhost:8080/api/";
// const PET_URL = "http://localhost:8090/api/";

const findAllPets = ()=>{
    return fetch(`${PET_URL}/pets`).then(res=>res.json())
}

const findPetById = (petId)=>{
    return fetch(`${PET_URL}/pet/${petId}`).then(res=>res.json())
}

const findPetsForUser = (userId)=>{
    return fetch(`${PET_URL}/pets/${userId}/pet`).then(res=>res.json())
}


const findPetsByKey = ()=>{}

///api/pets/{pid}
const updatePet = (petId, pet) =>
    fetch(`${PET_URL}/pets/${petId}`, {
        method: 'PUT',
        // credentials: 'same-origin',
        body: JSON.stringify(pet),
        headers:{
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

const deletePet = (petId)=>{
    return fetch(`${PET_URL}/pets/${petId}`, {
        method:'DELETE',
    }).then(response => response.json())
}

const createPet = (userId, pet)=>{
    return fetch(`${PET_URL}/pets/${userId}/pet`, {
    method: 'POST',
    body: JSON.stringify(pet),
    headers:{
        'content-type': 'application/json'
    }
})
    .then(response => response.json())}


export default {
    findAllPets,
    findPetById,
    findPetsByKey,
    findPetsForUser,
    updatePet,
    deletePet,
    createPet
}