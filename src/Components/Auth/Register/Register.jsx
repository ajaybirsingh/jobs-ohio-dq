import React, { useEffect, useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import JobsLogo from "../../../Assets/JobsOhioLogo.jpeg";
import axios from "axios";
import { APIUrlFour, isValidEmail } from "../../../Utils/Utils";
import Loader from "../../Loader/Loader";
import LabelInput from "../../LabelInputFields/Index";
import { LOGIN } from "../../../Utils/Constants";
import { useNavigate } from "react-router-dom";
// import Loader from "../Loader/Loader";
// import LabelInput from "../LabelInputFields/Index";
const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [UserRegister, setUserRegister] = useState({
        firstname: "",
        lastname: "",
        username: "",
        emailAddress: "",
        role: "",
        password: "",
    });
    const validateInputs = () => {
        if (UserRegister.firstname === "") {
            toast.error("Please Enter First Name");
            return false;
        }
        if (UserRegister.lastname === "") {
            toast.error("Please Enter Last Name");
            return false;
        }
        if (UserRegister.username === "") {
            toast.error("Please Enter User Name");
            return false;
        }
        if (UserRegister.role === "") {
            toast.error("Please Enter Role");
            return false;
        }
        if (
            !UserRegister?.emailAddress ||
            UserRegister?.emailAddress?.trim() === ""
        ) {
            toast.error("Please Enter Email address");
            return false;
        }
        if (!isValidEmail(UserRegister?.emailAddress)) {
            toast.error("Please Enter Valid Email Address");
            return false;
        }
        if (!UserRegister?.password || UserRegister?.password?.trim() === "") {
            toast.error("Please Enter Password");
            return false;
        }
        return true;
    };
    const RegisterUser = () => {
        if (!validateInputs()) return;
        setLoading(true);
        const data = {
            first_name: UserRegister.firstname,
            last_name: UserRegister.lastname,
            user_name: UserRegister.username,
            email: UserRegister.emailAddress,
            role: UserRegister.role,
            password: UserRegister.password,
        };
        const options = {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            url: `${APIUrlFour()}/v1/register_user`,
            data: data,
        };
        axios(options)
            .then((response) => {
                setLoading(false);
                if (response?.status === 200) {
                    toast.success(response.data.message);
                    navigate(LOGIN)
                    setUserRegister({
                        firstname: "",
                        lastname: "",
                        username: "",
                        emailAddress: "",
                        role: "",
                        password: "",
                    });
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };
    return (
        <>
            {loading ? <Loader /> : null}
            <section className="Register-section-main-container">
                <div className="section-Register-after-main">
                    <div>
                        <img src={JobsLogo} alt="logo" className="logo-register" />
                    </div>
                    <div className="Register-card-main">
                        <div className="Register-card-content-section">
                            <div className="Register-heading">
                                <h2>Sign up</h2>
                                <form
                                // onSubmit={loggingIn}
                                >
                                    <div className="Register-flex-container">
                                        <div className="Register-alliputs">
                                            <label htmlFor="">
                                                First Name{" "}
                                                <span className="Registermandatoryfields">*</span>
                                            </label>
                                            <LabelInput
                                                value={UserRegister.firstname}
                                                onChange={(e) => {
                                                    const inputvalue = e?.target?.value;
                                                    setUserRegister({
                                                        ...UserRegister,
                                                        firstname: inputvalue,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="Register-alliputs">
                                            <label htmlFor="">
                                                Last Name{" "}
                                                <span className="Registermandatoryfields">*</span>
                                            </label>
                                            <LabelInput
                                                value={UserRegister.lastname}
                                                onChange={(e) => {
                                                    const inputvalue = e?.target?.value;
                                                    setUserRegister({
                                                        ...UserRegister,
                                                        lastname: inputvalue,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="Register-flex-container">
                                        <div className="Register-alliputs">
                                            <label htmlFor="">
                                                User Name{" "}
                                                <span className="Registermandatoryfields">*</span>
                                            </label>
                                            <LabelInput
                                                value={UserRegister.username}
                                                onChange={(e) => {
                                                    const inputvalue = e?.target?.value;
                                                    setUserRegister({
                                                        ...UserRegister,
                                                        username: inputvalue,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="Register-alliputs">
                                            <label htmlFor="">
                                                Role <span className="Registermandatoryfields">*</span>
                                            </label>
                                            <LabelInput
                                                value={UserRegister.role}
                                                onChange={(e) => {
                                                    const inputvalue = e?.target?.value;
                                                    setUserRegister({
                                                        ...UserRegister,
                                                        role: inputvalue,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="Register-flex-container">
                                        <div className="Register-alliputs">
                                            <label htmlFor="">
                                                Email <span className="Registermandatoryfields">*</span>
                                            </label>
                                            <LabelInput
                                                value={UserRegister.emailAddress}
                                                onChange={(e) => {
                                                    const inputvalue = e?.target?.value;
                                                    setUserRegister({
                                                        ...UserRegister,
                                                        emailAddress: inputvalue,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="Register-alliputs">
                                            <label htmlFor="">
                                                Passsword{" "}
                                                <span className="Registermandatoryfields">*</span>
                                            </label>
                                            <LabelInput
                                                value={UserRegister.password}
                                                onChange={(e) => {
                                                    const inputvalue = e?.target?.value;
                                                    setUserRegister({
                                                        ...UserRegister,
                                                        password: inputvalue,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="Register-button-section">
                                        <p style={{ cursor: 'pointer' }}>Already have account? <span onClick={() => navigate(LOGIN)}>Login</span> </p>

                                        <button type="button" onClick={RegisterUser}>
                                            Sign up
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
export default Register;