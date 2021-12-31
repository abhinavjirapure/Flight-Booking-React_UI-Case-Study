import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import { adminArr, dashboardArr } from '../components/navbar-item/NavbarItem';
import "./image.css"
function NavBar() {

    let navigate = useNavigate();

    const navigateToLogin = ()=> {
        navigate("/login");

    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
        <img src = {logo} style ={{width:"15rem",height:"3rem"}}/>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        {dashboardArr.map(item=>
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={()=> navigate(item.path)}>{item.title}</a>
                        </li>
                        )}
                    </ul>
                    <form class="d-flex">
                        <button class="btn btn-outline-success" type="submit" onClick = {()=>navigateToLogin()}>Login</button>
                        {/* <button class="btn btn-outline-success" type="submit" onClick = {()=>navigateToLoginUser()}>Login</button>  */}
                    </form>
                </div>
            </div>
        </nav>
    )

}

export default NavBar;