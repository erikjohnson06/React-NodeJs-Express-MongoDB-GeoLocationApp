import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>All</NavLink>
        </li>
        <li>
            <NavLink to="/u1/locations">My Locations</NavLink>
        </li>
        <li>
            <NavLink to="/locations/new">Add New Location</NavLink>
        </li>
        <li>
            <NavLink to="/login">Sign In</NavLink>
        </li>
    </ul>;
};

export default NavLinks;