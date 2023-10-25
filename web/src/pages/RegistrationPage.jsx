import React, { useState } from "react";
import validator from "validator";

export default function RegistrationPage () {

    const [userData, setUserData] = useState("");
    const [errors, setErrors] = useState({});
    const {username, email, password, passwordRepeat} = userData;

    const validateData = () => {
        let errors = {};
        if (!username){
            errors.name = "Name is required!";
        }
        if (email) { 
            if (!validator.isEmail(email)){
                errors.email = "Correct E-mail is required!";
            }
        } else {
            errors.email = "E-mail is required!";
        }
        if (!password){
            errors.password = "Password is required!";
        }
        if (!passwordRepeat){
            errors.passwordRepeat = "Repeat the password!";
        } else {
            if (password != passwordRepeat){
            errors.wrongRepeat = "Repeated password is different!"
            }
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

    return(
        <div>
            <section style={{display:"flex", flexDirection:"column", maxWidth:"500px", margin:"auto", position:"relative", top:"100px"}}>
                <h1>Welcome to SigmaFinance🗿</h1>  
                <label>Name</label>
                <div style={{color:"red", fontSize:"12px"}}>{errors.name}</div>
                <input name="username" onChange={(e) => handleChange(e)}></input>

                <label>E-mail</label>
                <div style={{color:"red", fontSize:"12px"}}>{errors.email}</div>
                <input name="email" onChange={(e) => handleChange(e)}></input>
                
                <label>Password</label>
                <div style={{color:"red", fontSize:"12px"}}>{errors.password}</div>
                <input name="password" onChange={(e) => handleChange(e)}></input>
                
                <label>Repeat Password</label>
                <div style={{color:"red", fontSize:"12px"}}>{errors.passwordRepeat}</div>
                <div style={{color:"red", fontSize:"12px"}}>{errors.wrongRepeat}</div>
                <input name="passwordRepeat" onChange={(e) => handleChange(e)}></input>
                
                <button onClick={handleSave}>Become Sigma</button>
            </section>
        </div>
    );
}