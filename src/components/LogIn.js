import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';


function LogIn(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useHistory();
    const onChangeText = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            //save the token in local storage
            localStorage.setItem('token',json.authtoken);
            //redirect
            props.showAlert('Loged in successfully',"success")
            history.push('/');
        }else{
             props.showAlert('Invalid credentials',"danger")
        }
    }
    return (
        <>
            <h2>Log in your notebook</h2>
            <form onSubmit={handleLogin}  className="mt-3">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email}
                        placeholder="Enter email here" onChange={onChangeText} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password}
                        placeholder="Enter password here" onChange={onChangeText} required/>
                </div>
                <button type="submit" className="btn btn-dark">Log In</button>
            </form>
        </>
    )
}

export default LogIn
