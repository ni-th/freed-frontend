import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary rubik">
      <div className="container-fluid">

        {/* Brand */}
        {/* <Link className="navbar-brand" to="/">Navbar</Link> */}

        {/* Toggler for small screens */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Nav Items */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/category">Category</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/paper">Paper</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            
          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar