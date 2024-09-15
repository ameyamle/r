import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [id, changeId] = useState("");
    const [name, changeName] = useState("");
    const [password, changePassword] = useState("");
    const [email, changeEmail] = useState("");
    const [country, changeCountry] = useState("");
    const [phone, changePhone] = useState("");
    const [address, changeAddress] = useState("");
    const [gender, changeGender] = useState("");
    const navigate = useNavigate();

    const isValidate = () => {
        let isProceed = true;
        let errorMessage = "Please enter the value in ";
        if (id === null || id === "") {
            isProceed = false;
            errorMessage += "Username";
        }
        if (name === null || name === "") {
            isProceed = false;
            errorMessage += "Username";
        }
        if (password === null || password === "") {
            isProceed = false;
            errorMessage += "Username";
        }
        if (email === null || email === "") {
            isProceed = false;
            errorMessage += "Username";
        }

        if (!isProceed) {
            toast.warning(errorMessage);
        }
        else {
            //change regex later
            if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email))
            {
            }
            else
            {
                isProceed = false;
                toast.warning("Please enter valid email");
            }
        }
        return isProceed;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let regobj = {id,name,password,email,country,phone,address,gender};
        // console.log(regobj);
        if(isValidate())
        {
            fetch("http://localhost:8000/user",{
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(regobj)
            }).then((res)=>{
                toast.success("Registered successfully...");
                navigate("/login");
            }).catch((err)=>{
                toast.error("Registration failed!!!"+err.message);
            });
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>User Registration</h1>
                <div className="form-group">
                    <label>User Name <span className='errormsg'>*</span></label>
                    <input value={id} onChange={e => changeId(e.target.value)} className="form-control" placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label>Password <span className='errormsg'>*</span></label>
                    <input type='password' value={password} onChange={e => changePassword(e.target.value)} className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <label>Full Name <span className='errormsg'>*</span></label>
                    <input value={name} onChange={e => changeName(e.target.value)} className="form-control" placeholder="Enter full name" />
                </div>
                <div className="form-group">
                    <label>Email <span className='errormsg'>*</span></label>
                    <input value={email} onChange={e => changeEmail(e.target.value)} className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Phone <span className='errormsg'>*</span></label>
                    <input value={phone} onChange={e => changePhone(e.target.value)} className="form-control" placeholder="Enter phone" />
                </div>
                <div className="form-group">
                    <label>Country <span className='errormsg'>*</span></label>
                    <select value={country} onChange={e => changeCountry(e.target.value)} className="form-control">
                    {/* <option disabled selected="selected">Select country</option> */}
                    <option value="india">India</option>
                        <option value="usa">USA</option>
                        <option value="uk">UK</option>
                    </select>
                </div>

                <label>Gender <span className='errormsg'>*</span></label>
                <br />
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name='gender' value="male" checked={gender === 'male'} onChange={e => changeGender(e.target.value)} />
                    <label class="form-check-label">Male</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name='gender' value="female" checked={gender === 'female'} onChange={e => changeGender(e.target.value)} />
                    <label class="form-check-label">Female</label>
                </div>

                <div className="form-group">
                    <label>Address <span className='errormsg'>*</span></label>
                    <textarea value={address} onChange={e => changeAddress(e.target.value)} className="form-control" placeholder="Enter address" />
                </div>
                <br/>

                <button type="submit" className="btn btn-primary">Register</button>
                &nbsp;
                <Link to={'/login'} className="btn btn-danger">Close</Link>
            </form>
        </div>
    )
}
