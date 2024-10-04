import React, { useContext, useRef, useState } from "react";
import LoginContext from "../../store/loginContext";
import langContextObj from "../../store/langContext";
import { images } from "../../constants";
import Button from "../UI/button/Button";
import classes from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";

function LoginBox() {
    const loginCtx = useContext(LoginContext);
    const langCtx = useContext(langContextObj);
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const errorMessageRef = useRef<HTMLSpanElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    // Get API URL from environment variable
    const API_URL = process.env.REACT_APP_API_URL;

    async function loginHandler() {
        const Username = userNameRef.current?.value;
        const Password = passwordRef.current?.value;

        if (!Username || !Password) {
            setErrorMessage("Username and password are required.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/Admin/Auth/EMP_AUTH`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    email: Username,
                    password: Password,
                }),
            });

            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }

            const data = await response.json();

            if (data.error === '0') {
                sessionStorage.setItem('token', data.msg);
                loginCtx.toggleLogin();
                navigate("/");
            } else {
                setErrorMessage("Invalid username or password.");
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        }
    }

    return (
        <div className={`${classes.container} ${langCtx.lang === "fa" ? classes.rtl : ""}`}>
            <div className={classes.loginBox}>
                <div className={classes.logo}>
                    <img
                        src={images.logo}
                        alt="Logo"
                    />
                </div>

                <h4 className={classes.title}>{"Login to your account"}</h4>

                <input ref={userNameRef} type={"text"} placeholder={"Username"} />
                <input ref={passwordRef} type={"password"} placeholder={"Password"} />

                {errorMessage && (
                    <span ref={errorMessageRef} className={classes.errorMessage}>
                        {errorMessage}
                    </span>
                )}

                <Button type="button" onClick={loginHandler}>{"Login"}</Button>

                <p className={classes.signup}>{"Don't have an account?"} &nbsp;
                    <Link className={classes.forgat_pass} to='/signup'>Sign Up</Link>
                </p>
            </div>

            <div className={classes.keyPic}>
                <img src={require("../../assets/images/virtual labs.png")} alt="Virtual Labs Logo" />
            </div>
        </div>
    );
}

export default LoginBox;
