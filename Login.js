import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const [username, updateUsername] = useState("");
    const [password, updatePassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, [])

    const ProceedLogin = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log("proceed");
            fetch("http://localhost:8000/user/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp);
                if (Object.keys(resp).length === 0) {
                    toast.error("Please enter valid username");
                }
                else {
                    if (resp.password === password) {
                        toast.success("Login successful...");
                        sessionStorage.setItem('username', username);
                        navigate("/");
                    }
                    else {
                        toast.error("Please enter valid password");
                    }
                }
            }).catch((err)=> {
        toast.error("Login failed!!!" + err.message);
    })
}
            
        }
const validate = () => {
    let result = true;
    if (username === '' || username === null) {
        result = false;
        toast.warning("Please enter username");
    }
    if (password === '' || password === null) {
        result = false;
        toast.warning("Please enter password");
    }
    return result;
}



return (
    <div>

        <form onSubmit={ProceedLogin}>
            <h1>User Login</h1>
            <div className="form-group">
                <label>User Name <span className='errormsg'>*</span></label>
                <input value={username} onChange={e => updateUsername(e.target.value)} className="form-control" placeholder="Enter username" />
            </div>
            <div className="form-group">
                <label>Password <span className='errormsg'>*</span></label>
                <input type='password' value={password} onChange={e => updatePassword(e.target.value)} className="form-control" placeholder="Enter password" />
            </div>
            <br />

            <button type="submit" className="btn btn-primary">Login</button>
            &nbsp;
            <Link to={'/register'} className="btn btn-success">New User</Link>
        </form>

    </div>
)
}
