import classes from "./Profile.module.scss";
import ThemeContext from "../../../../store/themeContext";
import React, { useContext } from "react";

function Profile() {
    // Call useContext inside the Profile component
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`${classes.profile} ${theme}`}>
            <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}/>
            <div className={classes.profile__info}>
                <p style={{color: theme === 'dark' ? 'whitesmoke':'black'}} className={classes.profile__userName}>{"Hi Admin"}</p>
            </div>
        </div>
    );
}

export default Profile;