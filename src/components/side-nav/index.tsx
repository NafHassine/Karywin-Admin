import { Link, useLocation } from "react-router-dom";


const SideNav: React.FC<{}> = () => {
    const location = useLocation();

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
                    <li className={location.pathname === "/" ? "active" : ""}>
                        <Link to="/">
                            <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
                            <span className="menu-item-label">Dashboard</span>
                        </Link>
                    </li>
                </ul>
                <p className="menu-label">Taches</p>
                <ul className="menu-list">
                    <li className={location.pathname === "/bus-list" ? "active" : ""}>
                        <Link to="/bus-list">
                            <span className="icon"><i className="mdi mdi-table"></i></span>
                            <span className="menu-item-label">Bus List</span>
                        </Link>
                    </li>
                    <li className={location.pathname === "/user-list" ? "active" : ""}>
                        <Link to="/user-list">
                            <span className="icon"><i className="mdi mdi-square-edit-outline"></i></span>
                            <span className="menu-item-label">Users</span>
                        </Link>
                    </li>
                    {/* <li className="--set-active-profile-html">
                        <a href="!#">
                            <span className="icon"><i className="mdi mdi-account-circle"></i></span>
                            <span className="menu-item-label">Profile</span>
                        </a>
                    </li> */}
                </ul>
            </div>
        </aside>
    );
};

export default SideNav;