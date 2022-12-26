import React from 'react'
import { useLocation } from 'react-router-dom';


const MainTopBanner = () => {
    const location = useLocation();



    return (
        <nav className='main-top-banner'>
            <h1>
                <img src={require("../../../assets/img/logo_cashnamu_cms.png")} alt="캐시나무cms" />
            </h1>
            {location.pathname}</nav>
    )
}

export default MainTopBanner