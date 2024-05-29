import React, { useEffect, useState } from "react";


const SideNav: React.FC<{}> = () => {


    return (
        <aside className="aside is-placed-left is-expanded">
            <div className="aside-tools">
                <div>
                    Kary <b className="font-black">Win</b>
                </div>
            </div>
            <div className="menu is-menu-main">
                <p className="menu-label">General</p>
                <ul className="menu-list">
                    <li className="--set-active-index-html">
                        <a href="index.html">
                            <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
                            <span className="menu-item-label">Dashboard</span>
                        </a>
                    </li>
                </ul>
                <p className="menu-label">Examples</p>
                <ul className="menu-list">
                    <li className="--set-active-tables-html">
                        <a href="tables.html">
                            <span className="icon"><i className="mdi mdi-table"></i></span>
                            <span className="menu-item-label">Tables</span>
                        </a>
                    </li>
                    <li className="active">
                        <a href="forms.html">
                            <span className="icon"><i className="mdi mdi-square-edit-outline"></i></span>
                            <span className="menu-item-label">Forms</span>
                        </a>
                    </li>
                    <li className="--set-active-profile-html">
                        <a href="profile.html">
                            <span className="icon"><i className="mdi mdi-account-circle"></i></span>
                            <span className="menu-item-label">Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="login.html">
                            <span className="icon"><i className="mdi mdi-lock"></i></span>
                            <span className="menu-item-label">Login</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SideNav;