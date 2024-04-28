import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importez Link depuis 'react-router-dom'

function Student() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:8081/student/' + id);
            window.location.reload(); // Utilisez window.location.reload() pour recharger la page
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'> 
            <div className='w-50 bg-white rounded p-3'>
                {/* Utilisez la balise <Link> pour diriger l'utilisateur vers la page de création */}
                <Link to='/create' className='btn btn-success'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, i) => (
                            <tr key={i}>
                                <td>{student.Name}</td>
                                <td>{student.Email}</td>
                                <td> 
                                <Link to={`/update/${student.ID}`} className='btn btn-primary'>Update</Link>
                                <button className='btn btn-danger ms-2' onClick={e=>handleDelete(student.ID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;
