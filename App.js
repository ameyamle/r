import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/users').then(res => {
      setColumns(Object.keys(res.data[0]))
      setRecords(res.data)
    })
  }, [])

  return (

    <div className='container mt-5'>
      <h1>Registered Users</h1>
      <div className='text-end'>
        <Link to="/create" class='btn btn-primary'>Add</Link>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            {
              columns.map((c, i) => (
                <th key={i}>{c}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            records.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>
                  <Link to={`/update/${d.id}`} class='btn btn-success'>Update</Link>
                  {" "}
                  <button onClick={e => handleSubmit(d.id)} class="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );

  function handleSubmit(id) {
    const conf = window.confirm("Do you want to delete?")
    if (conf) {
      axios.delete('http://localhost:8000/users/' + id)
        .then(res => {
          alert("Data deleted successfully")
          navigate("/")
        })
        .catch(err => console.log(err));
    }
  }
}
export default App;
