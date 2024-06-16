import { faList, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { signOut } from 'firebase/auth';
import { auth } from "../../configs/firebase";


const TopNav: React.FC<{}> = () => {
    const logout = async () => {
        try {
            await signOut(auth);
            console.log('User signed out successfully');
            // Redirect to the login page or home page after logout
            window.location.href = 'auth/signin'; // Adjust the path as necessary
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };


    return (<nav id="navbar-main" className="navbar is-fixed-top">
        <div className="navbar-brand">
            <a className="navbar-item mobile-aside-button">
                <span className="icon"><i className="mdi mdi-forwardburger mdi-24px"></i></span>
            </a>
            <div className="navbar-item">
                <div className="control"><input placeholder="Search everywhere..." className="input" /></div>
            </div>
        </div>
        <div className="navbar-brand is-right">
            <a className="navbar-item --jb-navbar-menu-toggle" data-target="navbar-menu">
                <span className="icon"><i className="mdi mdi-dots-vertical mdi-24px"></i></span>
            </a>
        </div>
        <div className="navbar-menu" id="navbar-menu">
            <div className="navbar-end">
                <div className="navbar-item dropdown has-divider">
                    <a className="navbar-link">
                        <span className="icon"><i className="mdi mdi-menu"></i></span>
                        <span>Sample Menu</span>
                        <span className="icon">
                            <i className="mdi mdi-chevron-down"></i>
                        </span>
                    </a>
                    <div className="navbar-dropdown">
                        <a className="navbar-item">
                            <span className="icon"><i className="mdi mdi-logout"></i></span>
                            <span>Log Out</span>
                        </a>
                    </div>
                </div>
                <div className="navbar-item dropdown has-divider has-user-avatar">
                    <a className="navbar-link">
                        <div className="user-avatar">
                            <img src="https://avatars.dicebear.com/v2/initials/john-doe.svg" alt=" Admin" className="rounded-full" />
                        </div>
                        <div className="is-user-name"><span> Admin</span></div>
                        <span className="icon"><i className="mdi mdi-chevron-down"></i></span>
                    </a>
                    <div className="navbar-dropdown">
                        <a className="navbar-item">
                            <span className="icon"><i className="mdi mdi-logout"></i></span>
                            <span>Log Out</span>
                        </a>
                    </div>
                </div>
                <a title="Log out" className="navbar-item desktop-icon-only" onClick={logout}>
                    <span className="icon"><FontAwesomeIcon icon={faSignOutAlt} /></span>
                    <span>Log out</span>
                </a>
            </div>
        </div>
    </nav>
    );
};

export default TopNav;