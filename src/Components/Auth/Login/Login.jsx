import React, { useEffect, useState } from "react";
import "./Login.css";
import { useOktaAuth } from "@okta/okta-react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    APIUrlFour,
    SetUserId,
    isValidEmail,
} from "../../../Utils/Utils";
import axios from "axios";
import Loader from "../../Loader/Loader";
import JobsLogo from "../../../Assets/JobsOhioLogo.jpeg";
import { authClient } from "../../../Utils/Common";
import LabelInput from "../../LabelInputFields/Index";
import { REGISTER } from "../../../Utils/Constants";
const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        emailAddress: "",
        password: "",
    });
    const validateInputs = () => {
        if (
            !userDetails?.emailAddress ||
            userDetails?.emailAddress?.trim() === ""
        ) {
            toast.error("Please Enter Email address");
            return false;
        }
        if (!isValidEmail(userDetails?.emailAddress)) {
            toast.error("Please Enter Valid Email Address");
            return false;
        }
        if (!userDetails?.password || userDetails?.password?.trim() === "") {
            toast.error("Please Enter Password");
            return false;
        }
        return true;
    };
    const auth = useOktaAuth();
    const login = () => {
        if (!validateInputs()) return
        setLoading(true);
        const data = {
            email: userDetails.emailAddress,
            password: userDetails.password,
        };
        const options = {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            url: `${APIUrlFour()}/v1/login`,
            data: data,
        };
        axios(options)
            .then((response) => {
                setLoading(false);
                if (response?.status === 200) {
                    SetUserId("userId", response?.data?.user_id);
                    toast.success(response?.data.message)
                    setUserDetails({
                        emailAddress: "",
                        password: "",
                    });
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                setLoading(false);
            });
    };
    const loggingOut = async () => auth.oktaAuth.signOut();
    return (
        <>
            {loading ? <Loader /> : null}
            <section className="login-section-main">
                <div className="section-login-after-main">
                    <div>
                        <img src={JobsLogo} alt="logo" className="logo-login" />
                    </div>
                    <div className="login-card-main">
                        <div className="login-card-content-section">
                            <div className="heading-content-section">
                                <h2>Login </h2>
                                <form
                                // onSubmit={loggingIn}
                                >
                                    <div className="Login-user-all-inputs">
                                        <label htmlFor="">
                                            Email <span className="mandatoryfields">*</span>
                                        </label>
                                        <LabelInput
                                            value={userDetails.emailAddress}
                                            onChange={(e) => {
                                                const inputvalue = e?.target?.value;
                                                setUserDetails({
                                                    ...userDetails,
                                                    emailAddress: inputvalue,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="Login-user-all-inputs">
                                        <label htmlFor="">
                                            Passsword <span className="mandatoryfields">*</span>
                                        </label>
                                        <LabelInput
                                            value={userDetails.password}
                                            onChange={(e) => {
                                                const inputvalue = e?.target?.value;
                                                setUserDetails({
                                                    ...userDetails,
                                                    password: inputvalue,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="login-button-section">
                                        <p onClick={() => navigate(REGISTER)}> <span>Don't Have an Account?</span> Sign up</p>
                                        <button type="button" onClick={login}>
                                            Login
                                        </button>
                                    </div>
                                    {/* <div className="separator">
                                        <span>OR</span>
                                    </div> */}
                                    <div className="login-button-section-okta">
                                        {
                                            auth.authState?.isAuthenticated ? (
                                                <button type="submit" onClick={loggingOut}>
                                                    Logout
                                                </button>
                                            ) : null
                                            // <button type="submit" onClick={loggingIn}
                                            // >Login with Okta</button>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Login;