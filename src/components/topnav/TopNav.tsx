import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { useWindowSize } from "usehooks-ts";
import TopNavRightBox from "./rightBox/TopNavRightBox";
import SidebarContext from "../../store/sidebarContext";

import classes from "./TopNav.module.scss";

function TopNav() {
  const sideOpenCtx = useContext(SidebarContext);
  const { width } = useWindowSize();

  function openSidebarHandler() {
    sideOpenCtx.toggleSidebar();
    if (width <= 768) document.body.classList.toggle("sidebar__open");
  }

  return (
    <div className={classes.topNav}>
      <div className={classes.topNav_left}>
        <div className={classes.topNav_left_menu_icon} onClick={openSidebarHandler}>
          <Icon icon="ci:menu-alt-03" width="24" />
        </div>
        <div className={classes.topNav_left_menu} onClick={openSidebarHandler}>
          <div className="topNav_left_menu_open">
            <Icon icon="ci:menu-alt-03" width="24" />
          </div>

          <div className="topNav_left_menu_close">
            <Icon icon="eva:close-fill" width="24" />
          </div>
        </div>
      </div>
      <Icon icon="mingcute:notification-line" style={{color: 'black', height: '30px', width: '30px', alignItems:'flex-end'}}/>
      <TopNavRightBox />
    </div>
  );
}

export default TopNav;
