import React from 'react';
import Aside from "../Aside/Aside";

const Layout = (props) => {
    return (
        <>
            <Aside/>
            <main>{props.children}</main>
        </>
    );
};

export default Layout;