import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import "./dogcat-stylelist.css"
import movieService from "../services/pet-service"
import {AuthContext} from "../App"
const petFinderKey = "IERoPwTvvsgAtqgT71P7EhCx8nLMCsx4xvvP0zywOA6eSzWWal"
const petFinderSecret = "InqFifeZbO9QOwtLXTDQROwrzovrIbF2YfKVVl0o"



const DogCatSearch = () => {

    return (
        <form>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <h2 className="navbar-brand">Search Page</h2>
            </nav>
            <div className="auth-wrapper">
            <div className="auth-inner">
                <Link to={`/search/types/dog`}>
                   Dog
                </Link>
                <br/>
                <Link to={`/search/types/cat`}>
                   Cat
                </Link>
            </div>
            </div>

        </form>
    )
}


export default DogCatSearch