import React from "react";
import styles from './Layout.module.css';
import NavBar from "../components/NavBar/NavBar";

import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {

    return(
        <div className={styles.container}>
            <NavBar />
            <div>
                <Outlet />
            </div>
            
        </div>
    )
}

export default Layout;
