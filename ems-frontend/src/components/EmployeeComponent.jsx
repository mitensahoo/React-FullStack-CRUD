import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: ''
    })

    const navigator = useNavigate();
    
    function saveEmployee(e) {
        e.preventDefault();

        if(validateForm()){
            const employee = {firstname, lastname, email}
            console.log(employee)
    
            createEmployee(employee).then((response)=>{
                console.log(response.data);
                navigator('/employees')
            })
        }
    }

    function  validateForm(){
        let valid = true;

        const errorsCopy = {...errors}

        if (firstname.trim()) {
            errorsCopy.firstname = '';
        } else {
            errorsCopy.firstname = 'First name is required';
            valid = false;
        }

        if (lastname.trim()) {
            errorsCopy.lastname = '';
        } else {
            errorsCopy.lastname = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    return (
        <div className='container'><br /><br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className='text-center'>Add Employee Data</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">First Name:</label>
                                <input type="text"
                                    placeholder='Enter Employee first name'
                                    name='firstname'
                                    value={firstname}
                                    className={`form-control ${ errors.firstname ? 'is-invalid':''}`}
                                    onChange={(e)=> setFirstName(e.target.value)}
                                />
                                {errors.firstname && <div className='invalid-feedback'> {errors.firstname}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Last Name:</label>
                                <input type="text"
                                    placeholder='Enter Employee last name'
                                    name='lastname'
                                    value={lastname}
                                    className={`form-control ${ errors.lastname ? 'is-invalid':''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastname && <div className='invalid-feedback'> {errors.lastname}</div>}
                            </div>
                            
                            <div className="form-group mb-2">
                                <label className="form-label">Email ID:</label>
                                <input type="text"
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${ errors.email ? 'is-invalid':''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                            </div>

                            <button className='btn btn-success' onClick={saveEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent