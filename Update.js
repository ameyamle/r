import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Update() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/users/' + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        axios.put('http://localhost:8000/users/' + id, data)
            .then(res => {
                alert("Data updated successfully");
                navigate("/")
            })
    }

    return (
        <div className='d-flex w-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-light p-5'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">ID:</label>
                        <input type="text" className="form-control" name="name" value={data.id} disabled />
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
                    </div>
                    <br />
                    <button className="btn btn-info">Update</button>
                </form>
            </div >
        </div >
    )
}
