import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SupabaseContext } from "../supabaseContext";

export default function LoginPage() {

  const supabase = useContext(SupabaseContext)
  const [userData, setUserData] = useState("");
  const [errors, setErrors] = useState({});
  const { username, email, password, passwordRepeat } = userData;

  const validateData = () => {
    let errors = {};
    if (!username) {
      errors.name = "Name is required!";
    }

    if (!password) {
      errors.password = "Password is required!";
    }

    return errors;
  }

  const handleChange = (event) => {
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
    setErrors({});
    console.log(userData);
  }

  const loginOauth = (provider) => {
    supabase.auth.signInWithOAuth({ provider: provider }).then(
      data => console.log(data)
    )
  }

  return (
    <div className="w-screen h-screen flex place-content-center">
      <section className="flex flex-col justify-center w-3/5 h-fit p-3 m-5 rounded-md bg-secondary-content">
        <h1 className="text-3xl font-bold text-center">Welcome back to Sigma Finance🗿</h1>

        <div className="divider"> Login with email </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xl">E-Mail</span>
          </label>
          <input type="email" name="username" onChange={(e) => handleChange(e)}
            placeholder="Your e-mail"
            className="input input-bordered w-full" />
          <label className="label">
            <span className="label-text-alt text-error text-lg">{errors.name}</span>
          </label>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xl">Password</span>
          </label>
          <input type="password" name="password" onChange={(e) => handleChange(e)}
            placeholder="Your e-mail"
            className="input input-bordered w-full" />
          <label className="label">
            <span className="label-text-alt text-error text-lg">{errors.password}</span>
          </label>
        </div>

        <button className='btn btn-primary bg-primary-content btn-ghost' onClick={handleSave}>Log in</button>


        <p className="text-center italic"> Don't have an account?
          <Link className='link link-hover' to='/register'> Register </Link>
        </p>

        <div className="divider"> Or </div>

        <h2 className="text-2xl font-bold p-2"> Login using providers </h2>

        <button onClick={() => loginOauth('github')} className="btn text-black bg-white btn-ghost flex flex-row my-2 mx-5 min-w-fit">
          <img className='max-h-full' src='https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' alt='Github logo' />
          <p className='' > GitHub </p>
        </button>
        <div className="btn text-black bg-white btn-ghost flex flex-row my-2 mx-5 min-w-fit">
          <img className='max-h-full' src='https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20170301123009%21Google_%22G%22_Logo.svg' alt='Google logo' />
          <button onClick={() => loginOauth('google')}> Google </button>
        </div>
      </section>
    </div>
  );
}