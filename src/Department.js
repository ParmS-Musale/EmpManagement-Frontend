import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [DepartmentId, setDepartmentId] = useState(0);
  const [DepartmentName, setDepartmentName] = useState("");
  const [modalTitle, setModalTitle] = useState("Add Department");

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    try {
      const response = await axios.get("https://localhost:7055/api/Department");
      setDepartments(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  const changeDepartmentName = (e) => {
    setDepartmentName(e.target.value);
  };

  const sortResult = (column, ascending = true) => {
    const sortedDepartments = [...departments];
    sortedDepartments.sort((a, b) => {
      if (ascending) {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setDepartments(sortedDepartments);
  };

  const createClick = async () => {
    try {
      await axios.post("https://localhost:7055/api/Department", { DepartmentName });
      getDepartments();
    } catch (error) {
      console.error("Error creating department", error);
    }
  };

  const updateClick = async () => {
    try {
      // const response =await axios.put(`https://localhost:7055/api/Department/${DepartmentId}`, { DepartmentName });
      const response = await axios.put(`https://localhost:7055/api/Department`, {
        departmentId: DepartmentId,
        departmentName: DepartmentName
      });
      
      getDepartments();
      
      console.log(response)
    } catch (error) {
      console.error("Error updating department", error);
    }
  };

  const deleteClick = async (id) => {
    try {
      await axios.delete(`https://localhost:7055/api/Department/${id}`);
      getDepartments();
    } catch (error) {
      console.error("Error deleting department", error);
    }
  };

  const editClick = (dep) => {
    setModalTitle("Edit Department");
    setDepartmentId(dep.DepartmentId);
    setDepartmentName(dep.DepartmentName);
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortResult("DepartmentId", true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortResult("DepartmentId", false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-up-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                  </svg>
                </button>
              </div>
              DepartmentId
            </th>
            <th>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortResult("DepartmentName", true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortResult("DepartmentName", false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-up-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                  </svg>
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
              <td >
                <button
                  type="button"
                  className=" px-2 mr-2 rounded-md py-1 bg-red-500"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(dep)}
                >
                 Edit
                </button>
                <button
                  type="button"
                  className=" px-2 rounded-md py-1 bg-red-500"
                  onClick={() => deleteClick(dep.DepartmentId)}
                >
                 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal for adding/editing */}
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
                  value={DepartmentName}
                  onChange={changeDepartmentName}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
                <button type="button" className="btn btn-primary" onClick={createClick}>
                  Create Department
                </button>
                <button type="button" className="btn btn-primary" onClick={updateClick}>
                  Update Department
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;
