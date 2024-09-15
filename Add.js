import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Add()
{
    const [inputData, setInputData] = useState({ name:'', email:'' });
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8000/users', inputData)
        .then(res => {
            alert("Data added successfully");
            navigate("/")
        }).catch(err => console.log(err));
    }

    return (
        <div className='d-flex w-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-light p-5'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" name="name" placeholder="Name" onChange={e=>setInputData({...inputData,name:e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={e=>setInputData({...inputData,email:e.target.value})}/>
                    </div>
                    <br/>
                    <button className="btn btn-info">Add User</button>
                </form>
            </div>
        </div>
    )
}