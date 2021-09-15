import React from 'react';
import {NavLink} from "react-router-dom";

const Aside = () => {
    return (
        <aside>
            <nav>
                <NavLink to='/'>Entrance</NavLink>
                <NavLink to='/chat'>Chat</NavLink>
                <NavLink to='/calendar'>Calendar</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
                <NavLink to='/profile/edit'>Edit profile</NavLink>
                <NavLink to='/settings'>Settings</NavLink>
            </nav>
        </aside>
    );
};

export default Aside;