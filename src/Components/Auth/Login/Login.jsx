import React, {useState } from "react";
import "./Login.css";
import { useOktaAuth } from "@okta/okta-react";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    APIUrlFour,
    SetUserId,
    isValidEmail,
} from "../../../Utils/Utils";
import axios from "axios";
import Loader from "../../Loader/Loader";
import JobsLogo from "../../../Assets/JobsOhioLogo.jpeg";
import LabelInput from "../../LabelInputFields/Index";
import { ORGANIZATION, REGISTER } from "../../../Utils/Constants";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        emailAddress: "",
        password: "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handlePasswordVisible = () => {
        setPasswordVisible(!passwordVisible)
    }
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
    const login = (e) => {
        e?.preventDefault();
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
                    toast.success(response?.data.message);
                    navigate(ORGANIZATION)
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
                                    onSubmit={login}
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
                                        <div className="password-visible-section">
                                            <LabelInput
                                                value={userDetails.password}
                                                onChange={(e) => {
                                                    const inputvalue = e?.target?.value;
                                                    setUserDetails({
                                                        ...userDetails,
                                                        password: inputvalue,
                                                    });
                                                }}
                                                type={passwordVisible ? `text` : 'password'}
                                            />
                                            {
                                                passwordVisible ?
                                                    <VisibilityOffIcon className="icon-password-eye" onClick={() => handlePasswordVisible()} /> :
                                                    <VisibilityIcon className="icon-password-eye" onClick={() => handlePasswordVisible()} />
                                            }


                                        </div>

                                    </div>
                                    <div className="login-button-section">
                                        <p onClick={() => navigate(REGISTER)}> <span>Don't Have an Account?</span> Sign up</p>
                                        <button type="submit" onClick={login}>
                                            Login
                                        </button>
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