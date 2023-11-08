import React, { useContext, useState } from "react";
import validator from "validator";
import { SupabaseContext } from "../supabaseContext";
import { Link, useNavigate } from "react-router-dom";

export default function RegistrationPage() {

  const supabase = useContext(SupabaseContext);
  const navigate = useNavigate()
  
  const [userData, setUserData] = useState("");
  const [errors, setErrors] = useState({});
  const { email, password, passwordRepeat } = userData;

  const validateData = () => {
    let errors = {};
    if (email) {
      if (!validator.isEmail(email)) {
        errors.email = "Correct E-mail is required!";
      }
    } else {
      errors.email = "E-mail is required!";
    }
    if (!password) {
      errors.password = "Password is required!";
    }
    if (password.length < 6) {
      errors.password = "Password need to be at least 6 characters"
    }
    if (!passwordRepeat) {
      errors.passwordRepeat = "Repeat the password!";
    } else {
      if (password != passwordRepeat) {
        errors.passwordRepeat = "Repeated password is different!"
      }
    }


    return errors;
  }

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    const errors = validateData();
    if (Object.keys(errors).length) {
      setErrors(errors);
      console.log(errors)
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password
    })
    if (error) {
      setErrors({email: error.message})
    } else {
      // redirect logged in user to home here
      setErrors({});
      console.log(data.session);
      supabase.auth.signInWithPassword({ email: userData.email, password: userData.password }).then(
        msg => navigate('/')
      )
    }

  }


  const registerOauth = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider
    })

    if (error) {
      console.error("ERROR", error)
    } else {
      // redirect logged in user here
      console.log(data.session)
    }
  }


  return (
    <div className="w-screen h-screen flex place-content-center">
      <section className="flex flex-col justify-center w-3/5 h-fit p-3 m-5 rounded-md bg-secondary-content">
        <h1 className="text-3xl font-bold text-center">Ready to become a Sigma? 🗿</h1>

        <div className="divider"> Register with email </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xl">E-Mail</span>
          </label>
          <input type="email" name="email" onChange={(e) => handleChange(e)}
            placeholder="Your e-mail"
            className="input input-bordered w-full" />
          <label className="label">
            <span className="label-text-alt text-error text-lg">{errors.email}</span>
          </label>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xl">Password</span>
          </label>
          <input type="password" name="password" onChange={(e) => handleChange(e)}
            placeholder="Password"
            className="input input-bordered w-full" />
          <label className="label">
            <span className="label-text-alt text-error text-lg">{errors.password}</span>
          </label>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xl">Repeat password</span>
          </label>
          <input type="password" name="passwordRepeat" onChange={(e) => handleChange(e)}
            placeholder="Repeat password"
            className="input input-bordered w-full" />
          <label className="label">
            <span className="label-text-alt text-error text-lg">{errors.passwordRepeat}</span>
          </label>
        </div>

        <button className='btn btn-primary bg-primary-content btn-ghost' onClick={handleSave}>Register!</button>


        <p className="text-center italic"> Already have an account?
          <Link className='link link-hover' to='/login'> Log in </Link>
        </p>

        <div className="divider"> Or </div>

        <h2 className="text-2xl font-bold p-2"> Register using providers </h2>

        <button onClick={() => registerOauth('github')} className="btn text-black bg-white btn-ghost flex flex-row my-2 mx-5 min-w-fit">
          <img className='max-h-full' src='https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' alt='Github logo' />
          <p className='' > GitHub </p>
        </button>
        <div className="btn text-black bg-white btn-ghost flex flex-row my-2 mx-5 min-w-fit">
          <img className='max-h-full' src='https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20170301123009%21Google_%22G%22_Logo.svg' alt='Google logo' />
          <button onClick={() => registerOauth('google')}> Google </button>
        </div>
      </section>
    </div>
  );
}