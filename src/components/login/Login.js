import axios from "axios";
import React,{ Component,useState} from "react";
import { useNavigate } from 'react-router-dom'

const Login=()=>{
    
    const [password,setPassword]=useState('');
    const [username,setUserName]=useState('');
    const navigate = useNavigate();
    let isAuthorized=false;

const userChangeHandler=(event)=>{
     setUserName(event.target.value);
 }
 const passwordChangeHandler=(event)=>{
     setPassword(event.target.value);
 };

 const login=(e)=>{
     e.preventDefault();
    const credentails = {
     username,password
    }
    axios.post("http://localhost:8084/api/authenticate",credentails)
    .then(res=>{
        console.log("res",res);
        if(res.status===200)
        {
         console.log(credentails.username);
         if(credentails.username==="Ethan")
         {
         navigate("/admin-home")
         }
         else{
            navigate("/user-home")   
         }
        }
    }).catch(error=>{
        console.log("res",error);
        alert("Invalid credentails");
    })
    
};
    return (
        <div className="auth-wrapper">
        <div className="auth-inner">
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control"  value={username}
                    onChange={userChangeHandler} placeholder="Enter Username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password}
                    onChange={passwordChangeHandler} placeholder="Enter Password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit"  className="btn btn-primary btn-block" onClick={(e)=>login(e)}>Login</button>
                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}

            </form>
            </div>
            </div>

    )
}
export default Login;