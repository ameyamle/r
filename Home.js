import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    
    const navigate = useNavigate();
    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/login');
        }
    }, [])

    return (
        <div>
            <div>
                <div className='header'>
                    <Link className="lin" to={"/"}>Home</Link>
                    <Link to={"/login"} style={{ float: 'right' }} className="lin">Logout</Link>
                </div>
                <div className='text-center'>
                    <h1>Welcome</h1>
                </div>
            </div>
        </div>
    )
}
