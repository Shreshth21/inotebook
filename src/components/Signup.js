import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" })

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (credentials.password !== credentials.confirmpassword) {
      props.showAlert("passwords are not same!!", 'danger');
    }
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    };
    const url = "http://localhost:5000/api/auth/createuser";
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      props.showAlert("Account created successfully!", 'success');
      navigate("/home");
    } else {
      props.showAlert(json.error, 'danger');
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Create an Account!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
