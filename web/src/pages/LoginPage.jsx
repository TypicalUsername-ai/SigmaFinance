import React, { useState } from "react";

export default function LoginPage () {
    const [userData, setUserData] = useState("");
    const [errors, setErrors] = useState({});
    const {username, email, password, passwordRepeat} = userData;

    const validateData = () => {
        let errors = {};
        if (!username){
            errors.name = "Name is required!";
        }
    
        if (!password){
            errors.password = "Password is required!";
        }
    
        return errors;
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserData((prevData) => ({...prevData, [name]: value }));
    };

    const handleSave = async () => {
        const errors = validateData();
        if (Object.keys(errors).length){
            setErrors(errors);
            console.log(errors)
            return;
        }
        setErrors({});
        console.log(userData);
    }

    return (
        <div>
            <section style={{display:"flex", flexDirection:"column", maxWidth:"500px", margin:"auto", position:"relative", top:"100px"}}>
                <h1>Welcome back to Sigma Finance🗿</h1>  
                <label>Name</label>
                <div style={{color:"red", fontSize:"12px"}}>{errors.name}</div>
                <input name="username" onChange={(e) => handleChange(e)}></input>
                
                <label>Password</label>
                <div style={{color:"red", fontSize:"12px"}}>{errors.password}</div>
                <input name="password" onChange={(e) => handleChange(e)}></input>
                
                <button onClick={handleSave}>Log in</button>
            </section>
        </div>
    );
}