import React, { Component } from 'react'; 

function Menu() {
    return (

        <React.Fragment>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">ISC Chat</span>
            </a>
            <hr />

            <div className="dropdown">
                <a href="/" className="align-items-center text-white text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>Luis Rodriguez</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a className="dropdown-item" href="/">Profile</a></li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li><a className="dropdown-item" href="/">Sign out</a></li>
                </ul>
            </div>

            <hr />
        </React.Fragment>
    )
}

export default Menu;