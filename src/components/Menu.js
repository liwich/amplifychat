import React from 'react';

function Menu({user, signOut}) {

    return (

        <React.Fragment>
            <div href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">ISC Chat</span>
            </div>
            <hr />

            <div className="dropdown">
                <div className="align-items-center text-white text-decoration-none dropdown-toggle"
                    style={{cursor:'pointer'}}
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/liwich.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>{user.attributes.name} {user.attributes.family_name}</strong>
                </div>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><button className="dropdown-item" onClick={()=> signOut()}>Sign out</button></li>
                </ul>
            </div>

            <hr />
        </React.Fragment>
    )
}

export default Menu;