import React, { useRef, useState } from "react";
import classes from "../components/login/Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/UI/button/Button";

function SignUpBox() {
    const userNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const errorMessageRef = useRef<HTMLSpanElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    async function signUpHandler() {
        const Username = userNameRef.current?.value;
        const Email = emailRef.current?.value;
        const Password = passwordRef.current?.value;

        if (!Username || !Email || !Password) {
            setErrorMessage("All fields are required.");
            return;
        }

        try {
            let API_URL = process.env.REACT_APP_API_URL;
            const response = await fetch(`${API_URL}/Employee/Register/initial`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    name: Username,
                    email: Email,
                    password: Password,
                }),
            });

            if (!response.ok) {
                throw new Error("Registration failed. Please try again.");
            }

            const data = await response.json();
            if (data.error === '0') {
                navigate("/login");  // Navigate to the login page on successful signup
            } else {
                setErrorMessage("Registration failed. Please check your details.");
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        }
    }

    return (
        <div className={`${classes.container}`}>
            <div className={classes.loginBox}>
                <div className={classes.logo}>
                    <img
                        src={require("../assets/images/IIT K Logo.png")}
                        alt="Logo"
                    />
                </div>

                <h4 className={classes.title}>{"Create your account"}</h4>

                <input ref={userNameRef} type={"text"} placeholder={"Name"} />
                <input ref={emailRef} type={"email"} placeholder={"Email"} />
                <input ref={passwordRef} type={"password"} placeholder={"Password"} />

                {errorMessage && (
                    <span ref={errorMessageRef} className={classes.errorMessage}>
                        {errorMessage}
                    </span>
                )}

                <Button type="button" onClick={signUpHandler}>{"Sign Up"}</Button>

                <p className={classes.signup}>{"Already have an account?"} &nbsp;
                    <Link className={classes.forgat_pass} to='/login'>Login</Link>
                </p>
            </div>

            <div className={classes.keyPic}>
                <img src={require("../assets/images/virtual labs.png")} alt="Virtual Labs Logo" />
            </div>
        </div>
    );
}

export default SignUpBox;
