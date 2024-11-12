import React from 'react';
import './App.css';
import { Home } from './Home';
import Department from './Department';
import Employee from './Employee';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Bootstrap Navigation Bar */}
        <nav className="navbar navbar-expand-lg bg-red-600 text-white rounded shadow mb-4">
        <div className="container-fluid">
          <img src="/Logo.png" alt="LOGO" className="img-fluid" style={{ width: '60px', height: '60px' }} />
          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link"
                    to="/home"
                    activeClassName="active"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link"
                    to="/department"
                    activeClassName="active"
                  >
                    Department
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link"
                    to="/employee"
                    activeClassName="active"
                  >
                    Employee
                  </NavLink>
                </li>
              </ul>
              {/* <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                /> */}
                <button className="btn btn-outline-success" type="submit">
                  Login
                </button>
              {/* </form> */}
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
