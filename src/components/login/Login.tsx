// import React, {useContext, useRef} from "react";
//
// import LoginContext from "../../store/loginContext";
// import langContextObj from "../../store/langContext";
// import {images} from "../../constants";
// import Input from "../UI/input/Input";
// import Button from "../UI/button/Button";
// import classes from "./Login.module.scss";
// import {Link, useNavigate} from "react-router-dom";
//
// function LoginBox() {
//     const loginCtx = useContext(LoginContext);
//     const langCtx = useContext(langContextObj);
//     const userNameRef = useRef<HTMLInputElement>(null);
//     const errorMessageRef = useRef<HTMLSpanElement>(null);
//     const navigate = useNavigate();
//
//     let isValid = true;
//
//     function loginHandler(e: React.FormEvent) {
//         e.preventDefault();
//         isValid = userNameRef.current?.value === "admin";
//         if (userNameRef.current) {
//             if (isValid) {
//                 loginCtx.toggleLogin();
//                 navigate("/");
//             } else {
//                 userNameRef.current.focus();
//                 errorMessageRef.current?.setAttribute(
//                     "style",
//                     "display: inline-block;opacity: 1"
//                 );
//             }
//         }
//     }
//
//     return (
//         <div className={`${classes.container}
//             ${ langCtx.lang === "fa" ? classes.rtl : ""}`}>
//             <div className={classes.loginBox} style={{height: "85vh"}}>
//                 <div className={classes.logo}>
//                     <br/>
//                     <br/>
//                     <br/>
//                     <img src={images.logo} alt="digikala"
//                          style={{width: '150px', height: '130px', justifyContent: 'center', alignItems: 'center'}}/>
//                 </div>
//                 <br/>
//                 <br/>
//                 <h4 className={classes.title}>{"Login Page"}</h4>
//                 <form onSubmit={loginHandler}>
//                     {/* UserName Field*/}
//                     <Input ref={userNameRef} type={"text"} id={"userName"} placeholder={"User Name"}/>
//                     <span ref={errorMessageRef} className={classes.errorMessage}>
//                         {"errorMessage"}
//                     </span>
//                     {/* Password Field */}
//                     <Input type={"password"} id={"pass"} placeholder={"Pass Word"}/>
//
//                     <Button type="submit">{"Login"}</Button>
//                     <Link className={classes.forgat_pass} to="/recoverAccount">
//                         {"Forgot Password?"}
//                     </Link>&nbsp;&nbsp;&nbsp;
//                     <Link className={classes.forgat_pass} to="/signup">
//                         {"Don't have an account?"}
//                     </Link>
//                     <div className={classes.checkbox}>
//                         <input type="checkbox" id="rememberMe"/>
//                         <label htmlFor="rememberMe">{"Remember Me"}</label>
//                     </div>
//                 </form>
//             </div>
//
//             {/*virtual labs logo*/}
//             <div className={classes.keyPic} style={{justifyContent: 'right'}}>
//                 <img src={require("../../assets/images/virtual labs.png")} alt="virtual labs logo"/>
//             </div>
//         </div>
//     );
// }

// export default LoginBox;

import React, { useContext, useRef, useState } from "react";
import LoginContext from "../../store/loginContext";
import langContextObj from "../../store/langContext";
import { images } from "../../constants";
import Input from "../UI/input/Input";
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

    async function loginHandler() {
        // Collect user inputs
        const Username = userNameRef.current?.value;
        const Password = passwordRef.current?.value;

        // Validate input
        if (!Username || !Password) {
            setErrorMessage("Username and password are required.");
            return;
        }

        // Make the API request
        try {
            const response = await fetch("http://localhost:8000/Admin/Auth/EMP_AUTH", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: Username,
                    password: Password,
                }),
            });

            // Check the response status
            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }

            const data = await response.json();
            console.log(data);
            console.log(data.msg);

            // Handle success (assuming the response contains a token or user data)
            if (data.error=='0') {
                console.log("Login Successful!");
                localStorage.setItem('token', data.msg);
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
            <div className={classes.loginBox} style={{ height: "85vh" }}>
                <div className={classes.logo}>
                    <br />
                    <br />
                    <br />
                    <img
                        src={images.logo}
                        alt="digikala"
                        style={{ width: "150px", height: "130px", justifyContent: "center", alignItems: "center" }}
                    />
                </div>
                <br />
                <br />
                <h4 className={classes.title}>{"Login Page"}</h4>

                <div>
                    {/* Username Field */}
                    <Input ref={userNameRef} type={"text"} id={"userName"} placeholder={"User Name"} />
                    {/* Password Field */}
                    <Input ref={passwordRef} type={"password"} id={"pass"} placeholder={"Pass Word"} />

                    {/* Error message */}
                    {errorMessage && (
                        <span ref={errorMessageRef} className={classes.errorMessage}>
                            {errorMessage}
                        </span>
                    )}

                    <Button type="button" onClick={loginHandler}>{"Login"}</Button>
                </div>

                <Link className={classes.forgat_pass} to="/recoverAccount">
                    {"Forgot Password?"}
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link className={classes.forgat_pass} to="/signup">
                    {"Don't have an account?"}
                </Link>
                <div className={classes.checkbox}>
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe">{"Remember Me"}</label>
                </div>
            </div>

            {/* virtual labs logo */}
            <div className={classes.keyPic} style={{ justifyContent: "right" }}>
                <img src={require("../../assets/images/virtual labs.png")} alt="virtual labs logo" />
            </div>
        </div>
    );
}

export default LoginBox;
