import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    // const dummyData = [
    //     {
    //         "id": 1,
    //         "firstName": "Miten",
    //         "lastName": "Sahoo",
    //         "email": "miten@gmail.com"
    //     },
    //     {
    //         "id": 2,
    //         "firstName": "Ram",
    //         "lastName": "Sahoo",
    //         "email": "ram@gmail.com"
    //     },
    //     {
    //         "id": 4,
    //         "firstName": "Ram",
    //         "lastName": "Kapoor",
    //         "email": "ramk@gmail.com"
    //     }
    // ]

    //connecting backend data in mysql to the frontend by assigning the data to its
    //correcponding table row and column
    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])



    function getAllEmployees() {
        listEmployee().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function addNewEmployee() {
        navigator('/add-employee')
    }
    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }
    function removeEmployee(id) {
        console.log(id);

        deleteEmployee(id).then((response)=>{

            getAllEmployees();

        }).catch(error => {
            console.error(error);
        })
    }
    
    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className='btn btn-success mb-2' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)} style={{marginLeft: '10px'}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent