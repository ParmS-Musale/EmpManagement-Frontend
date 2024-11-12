import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [departmentName, setDepartmentName] = useState("");
  const [modalTitle, setModalTitle] = useState("Add Department");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("https://localhost:7055/api/Department");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  // Handle department name input change
  const handleDepartmentNameChange = (e) => {
    setDepartmentName(e.target.value);
  };

  // Handle sorting of departments by column
  const sortDepartments = (column, ascending = true) => {
    const sortedDepartments = [...departments].sort((a, b) => {
      const compare = ascending ? a[column] > b[column] : a[column] < b[column];
      return compare ? 1 : -1;
    });
    setDepartments(sortedDepartments);
  };

  // Handle creating a new department
  const createDepartment = async () => {
    if (!departmentName) return;

    try {
      await axios.post("https://localhost:7055/api/Department", {
        departmentName,
      });
      fetchDepartments(); // Reload departments after creation
      setDepartmentName(""); // Clear input after creating
    } catch (error) {
      console.error("Error creating department", error);
    }
  };

  // Handle updating an existing department
  const updateDepartment = async () => {
    if (!departmentName || departmentId === null) return;

    try {
      await axios.put(`https://localhost:7055/api/Department/${departmentId}`, {
        departmentName,
      });
      fetchDepartments(); // Reload departments after update
      setDepartmentName(""); // Clear input after updating
      setIsEditing(false); // Reset editing state
    } catch (error) {
      console.error("Error updating department", error);
    }
  };

  // Handle deleting a department
  const deleteDepartment = async (id) => {
    try {
      await axios.delete(`https://localhost:7055/api/Department/${id}`);
      fetchDepartments(); // Reload departments after deletion
    } catch (error) {
      console.error("Error deleting department", error);
    }
  };

  // Set modal data for editing a department
  const handleEditClick = (dep) => {
    setModalTitle("Edit Department");
    setDepartmentId(dep.DepartmentId);
    setDepartmentName(dep.DepartmentName);
    setIsEditing(true);
  };

  // Set modal data for adding a new department
  const handleAddClick = () => {
    setModalTitle("Add Department");
    setDepartmentId(null);
    setDepartmentName("");
    setIsEditing(false);
  };

  return (
    <div>
      {/* Department Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortDepartments("DepartmentId", true)}
                >
                  ⬆️
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortDepartments("DepartmentId", false)}
                >
                  ⬇️
                </button>
              </div>
              DepartmentId
            </th>
            <th>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortDepartments("DepartmentName", true)}
                >
                  ⬆️
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortDepartments("DepartmentName", false)}
                >
                  ⬇️
                </button>
              </div>
              DepartmentName
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep) => (
            <tr key={dep.DepartmentId}>
              <td>{dep.DepartmentId}</td>
              <td>{dep.DepartmentName}</td>
              <td>
                <button
                  type="button"
                  className="px-2 mr-2 rounded-md py-1 bg-red-500"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEditClick(dep)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="px-2 rounded-md py-1 bg-red-500"
                  onClick={() => deleteDepartment(dep.DepartmentId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing department */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {modalTitle}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={departmentName}
                  onChange={handleDepartmentNameChange}
                  placeholder="Enter department name"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleAddClick} // Reset modal state on close
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={isEditing ? updateDepartment : createDepartment}
              >
                {isEditing ? "Update Department" : "Create Department"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;
