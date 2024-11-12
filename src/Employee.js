import React, { useState, useEffect } from 'react';
import { variables } from './variables';

const Employee = () => {
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [employeeId, setEmployeeId] = useState(0);
    const [employeeName, setEmployeeName] = useState("");
    const [department, setDepartment] = useState("");
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [photoFileName, setPhotoFileName] = useState("anonymous.png");
    const [photoPath, setPhotoPath] = useState(variables.PHOTO_URL);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Fetch data when component mounts
    useEffect(() => {
        refreshList();
    }, []);

    // Fetch employees and departments
    const refreshList = async () => {
        try {
            const empResponse = await fetch(`${variables.API_URL}employee`);
            const empData = await empResponse.json();
            setEmployees(empData);

            const depResponse = await fetch(`${variables.API_URL}department`);
            const depData = await depResponse.json();
            setDepartments(depData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Input change handlers
    const handleNameChange = (e) => setEmployeeName(e.target.value);
    const handleDeptChange = (e) => setDepartment(e.target.value);
    const handleDateChange = (e) => setDateOfJoining(e.target.value);

    // Add and Edit Modal setup
    const addClick = () => {
        setModalTitle("Add Employee");
        setEmployeeId(0);
        setEmployeeName("");
        setDepartment("");
        setDateOfJoining("");
        setPhotoFileName("anonymous.png");
    };

    const editClick = (emp) => {
        setModalTitle("Edit Employee");
        setEmployeeId(emp.EmployeeId);
        setEmployeeName(emp.EmployeeName);
        setDepartment(emp.Department);
        setDateOfJoining(emp.DateOfJoining);
        setPhotoFileName(emp.PhotoFileName);
    };

    // Create and update employee
    const createEmployee = async () => {
        try {
            const response = await fetch(`${variables.API_URL}employee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    EmployeeName: employeeName,
                    Department: department,
                    DateOfJoining: dateOfJoining,
                    PhotoFileName: photoFileName,
                }),
            });
            const result = await response.json();
            setFeedbackMessage(result);
            refreshList();
        } catch (error) {
            setFeedbackMessage('Failed to create employee');
        }
    };

    const updateEmployee = async () => {
        try {
            const response = await fetch(`${variables.API_URL}employee`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    EmployeeId: employeeId,
                    EmployeeName: employeeName,
                    Department: department,
                    DateOfJoining: dateOfJoining,
                    PhotoFileName: photoFileName,
                }),
            });
            const result = await response.json();
            setFeedbackMessage(result);
            refreshList();
        } catch (error) {
            setFeedbackMessage('Failed to update employee');
        }
    };

    const deleteEmployee = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const response = await fetch(`${variables.API_URL}employee/${id}`, {
                    method: 'DELETE',
                });
                const result = await response.json();
                setFeedbackMessage(result);
                refreshList();
            } catch (error) {
                setFeedbackMessage('Failed to delete employee');
            }
        }
    };

    // File upload
    const handleFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        try {
            const response = await fetch(`${variables.API_URL}employee/savefile`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setPhotoFileName(data);
        } catch (error) {
            setFeedbackMessage('Failed to upload image');
        }
    };

    return (
        <div className="container">
            {/* Feedback Message */}
            {feedbackMessage && <div className="alert alert-info">{feedbackMessage}</div>}

            <button
                type="button"
                className="btn btn-primary m-2 float-end transition duration-300 ease-in-out hover:bg-blue-600 hover:scale-105"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={addClick}>
                Add Employee
            </button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>EmployeeId</th>
                        <th>EmployeeName</th>
                        <th>Department</th>
                        <th>Date Of Joining</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.EmployeeId} className="hover:bg-gray-100">
                            <td>{emp.EmployeeId}</td>
                            <td>{emp.EmployeeName}</td>
                            <td>{emp.Department}</td>
                            <td>{emp.DateOfJoining}</td>
                            <td>
                                <button
                                    className="btn btn-light mr-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => editClick(emp)}>
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteEmployee(emp.EmployeeId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control mb-3" value={employeeName} onChange={handleNameChange} placeholder="Employee Name" />
                            <select className="form-control mb-3" value={department} onChange={handleDeptChange}>
                                {departments.map(dep => (
                                    <option key={dep.DepartmentId}>{dep.DepartmentName}</option>
                                ))}
                            </select>
                            <input type="date" className="form-control mb-3" value={dateOfJoining} onChange={handleDateChange} />
                            <input type="file" className="form-control" onChange={handleFileUpload} />
                        </div>
                        <div className="modal-footer">
                            {employeeId === 0 ? (
                                <button className="btn btn-primary" onClick={createEmployee}>Create</button>
                            ) : (
                                <button className="btn btn-primary" onClick={updateEmployee}>Update</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;
