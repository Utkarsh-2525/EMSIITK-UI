import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { images } from "../../constants";
import sidebarNav from "../../config/sidebarNav";
import SidebarContext from "../../store/sidebarContext";
import LoginContext from "../../store/loginContext";
import { Icon } from "@iconify/react";
import classes from "./Sidebar.module.scss";

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [submenuOpen, setSubmenuOpen] = useState<number | null>(null); // Track open submenu
    const { width } = useWindowSize(); // Get window width for responsive handling
    const location = useLocation();
    const sidebarCtx = useContext(SidebarContext); // Context to control sidebar state
    const loginCtx = useContext(LoginContext); // Context for login/logout state

    // Toggle the sidebar based on screen size
    const openSidebarHandler = () => {
        if (width <= 768) {
            document.body.classList.toggle("sidebar__open");
        } else {
            sidebarCtx.toggleSidebar(); // Use the context to control open/close
        }
    };

    // Handle logout and remove token
    const logoutHandler = () => {
        sessionStorage.removeItem("token"); // Remove token from sessionStorage
        loginCtx.toggleLogin();
    };

    useEffect(() => {
        const curPath = window.location.pathname.split("/")[1];
        const activeItem = sidebarNav.findIndex((item) => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    // Toggle submenu open/close
    const toggleSubmenu = (index: number) => {
        setSubmenuOpen(submenuOpen === index ? null : index); // Close if the same menu is clicked again
    };

    return (
        <div className="main-content">
            <div className={`${classes.sidebar} ${!sidebarCtx.isOpen && classes.sidebar_close}`}>
                <div className={classes.sidebar__logo}>
                    <Link to="/">
                        <img src={images.logo} alt="IITK" />
                    </Link>
                </div>

                <div className={classes.sidebar__menu}>
                    {sidebarNav.map((nav, index) => (
                        <div key={`nav-${index}`}>
                            <Link
                                to={nav.link || "#"}
                                className={`${classes.sidebar__menu__item} ${
                                    activeIndex === index && classes.active
                                }`}
                                onClick={() => {
                                    if (nav.submenu) toggleSubmenu(index);
                                }}
                            >
                                <div className={classes.sidebar__menu__item__icon}>
                                    <Icon icon={nav.icon} />
                                </div>
                                <div className={classes.sidebar__menu__item__txt}>{nav.section}</div>
                                {nav.submenu && (
                                    <Icon
                                        icon="mdi:chevron-down"
                                        className={`${classes.arrow} ${submenuOpen === index ? classes.open : ""}`}
                                    />
                                )}
                            </Link>

                            {/* Render Submenu */}
                            {nav.submenu && (
                                <div
                                    className={`${classes.submenu} ${
                                        submenuOpen === index ? classes.submenu_open : ""
                                    }`}
                                >
                                    {nav.submenu.map((submenuItem, subIndex) => (
                                        <Link
                                            to={submenuItem.link}
                                            key={`submenu-${subIndex}`}
                                            className={classes.sidebar__submenu__item}
                                        >
                                            {submenuItem.text || "Unknown"}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={[classes.sidebar__menu, classes.logout].join("")}>
                    <Link to="/login" className={classes.sidebar__menu__item} onClick={logoutHandler}>
                        <div className={classes.sidebar__menu__item__icon}>
                            <Icon icon="tabler:logout" />
                        </div>
                        <div className={classes.sidebar__menu__item__txt}>{"Logout"}</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
