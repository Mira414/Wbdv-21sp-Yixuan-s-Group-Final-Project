const initialState = {
    pets:[]
}

const AdminPetReducer = (preState=initialState, action) => {
    switch (action.type) {
        case "FIND_ALL_PETS":
            return {...preState, pets: action.allPets}
        case "FIND_PETS_FOR_USER":
            return {
                ...preState, pets: action.petsForUser
            }
        case "ADMIN_DELETE_PET":
            return {...preState,
                // modules: preState.modules.filter(
                //     module => module._id === action.moduleIdToDelete? false : true)
                pets: preState.pets.filter(pet => {
                    // console.log(pet.petId)
                    if(pet.petId === action.petIdToDelete) {
                        return false;
                    } else{
                        return true;
                    }
                })
            }
        case "UPDATE_PET":
            return {

                pets: preState.pets.filter(pet => pet.petId !== action.pet.petId ? pet : action.pet)
            }
        default: return preState
    }
}

export default AdminPetReducer