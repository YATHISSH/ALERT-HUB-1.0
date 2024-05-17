import React, { useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import validation from './Validation';
import { MdLocationCity } from "react-icons/md";
import { RiUserLocationLine } from "react-icons/ri";
const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    const newObj = { ...data, [e.target.name]: e.target.value };
    setData(newObj);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(validation(data));
    setSubmit(true);

    if (Object.keys(error).length === 0 && submit) {
      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          // Redirect or show success message
          console.log('User signed up successfully');
          navigate('/'); // Redirect to login page
        } else {
          const { errorType, message } = await response.json();
          if (errorType === 'emailExists') {
            setError({ email: message });
          } else {
            // Handle other error types if needed
            console.error(message);
          }
        }
      } catch (error) {
        // Handle network or server errors
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="container-form">
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <p>Please fill the input below here.</p>

          <div className="inputBox">
            <AiOutlineUser className='fullName' />
            <input type='text'
              name="fullname"
              id="fullname"
              onChange={handleChange}
              placeholder='Full Name'
            />
          </div>
          {error.fullname && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.message}</span>}

          <div className="inputBox">
            <FiMail className='mail' />
            <input type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder='Email'
            />
          </div>
          {error.email && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.email}</span>}

          <div className="inputBox">
            <RiLockPasswordLine className='password' />
            <input type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder='Password'
            />
          </div>
          {error.password && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.password}</span>}


          <div className="inputBox">
            <RiLockPasswordLine className='password' />
            <input type="password"
              name="confirmpassword"
              id="confirmPassword"
              onChange={handleChange}
              placeholder='Confirm Password'
            />
          </div>
          {error.confirmpassword && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.confirmpassword}</span>} 

        <div className="inputBox">
            <MdLocationCity className='fullName' />
            <input type='text'
              name="Citytown"
              id="Citytown"
              onChange={handleChange}
              placeholder='City/Town'
            />
          </div>
          {error.Citytown && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.Citytown}</span>} 

           <div className="inputBox">
            <RiUserLocationLine className='fullName' />
            <input type='number'
              name="pincode"
              id="pincode"
              onChange={handleChange}
              maxLength="6"
              placeholder='Pincode must contain max of 6 Characters'
              onInput={(e) => e.target.value = e.target.value.slice(0, 6)}
            />
          </div>
          {error.pincode && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.pincode}</span>}  

          <div className='divBtn'>
            <small className='FG'>Forgot Password?</small>
            <button className='loginBtn'>SIGN UP</button>
          </div>

        </form>

        <div className='dont'>
          <p>Already have a account? <Link to="/"><span>Sign in</span></Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp;