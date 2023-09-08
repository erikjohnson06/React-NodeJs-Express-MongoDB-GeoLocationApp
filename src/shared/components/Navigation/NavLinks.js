import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {

    const auth = useContext(AuthContext);

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact="true">All</NavLink>
        </li>
        {auth.isLoggedIn &&
            <li>
                <NavLink to={`${auth.userId}/locations`}>My Locations</NavLink>
            </li>
        }
        {auth.isLoggedIn &&
        <li>
            <NavLink to="/locations/new">Add New Location</NavLink>
        </li>
        }
        {!auth.isLoggedIn &&
        <li>
            <NavLink to="/login">Sign In</NavLink>
        </li>
        }
        {auth.isLoggedIn &&
        <li>
            <button onClick={auth.logout}>Logout</button>
        </li>
        }
    </ul>;
};

export default NavLinks;