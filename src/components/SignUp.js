import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function SignUp(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useHistory();

    const onChangeText = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSignUp = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the token in local storage
            localStorage.setItem('token',json.authtoken);
            //redirect
            props.showAlert('Accounter created successfully',"success");

            history.push('/login');
        }else{
            props.showAlert('Invalid details',"danger");

        }
    }
    return (
        <>
            <h2>Sign Up to use NoteBook</h2>
            <form onSubmit={handleSignUp}  className="mt-3">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name}
                        placeholder="Enter name here" onChange={onChangeText} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email}
                        placeholder="Enter email here" onChange={onChangeText} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password}
                        placeholder="Enter password here" onChange={onChangeText} minLength={5} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword}
                        placeholder="Enter password here" onChange={onChangeText} required />
                </div>
                <button type="submit" className="btn btn-dark">Sign Up</button>
            </form>
        </>
    )
}

export default SignUp
