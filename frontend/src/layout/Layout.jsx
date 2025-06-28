import React from "react";
import HeaderWhite from "./components/HeaderWhite";

const Layout = ({ children, useHeaderWhite = false }) => {
    return (
        <div>
            {useHeaderWhite && <HeaderWhite />}
            <main>{children}</main>
        </div>
    );
};

export default Layout;
