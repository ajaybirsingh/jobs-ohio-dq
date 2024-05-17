import React, { useEffect, useState } from "react";
import { authClient } from "../../../Utils/Common";
import { useNavigate } from "react-router-dom";
import { APIUrlOne, SetOktaAuthData, SetUserId } from "../../../Utils/Utils";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";

const LoginVerify = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [retrieveSearchData, setRetrieveSearchData] = useState({
    code: "",
    state: "",
  });
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    setRetrieveSearchData({
      code: code,
      state: state,
    });
  }, []);

  useEffect(() => {
    if (retrieveSearchData?.code && retrieveSearchData?.state) {
      login();
    }
  }, [retrieveSearchData]);

  const login = async () => {
    setLoading(true);
    let res = await authClient?.session?.get();
    let email = res?.login;
    let user = await res?.user();
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/get_user_id?email=${email}`,
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        if (e?.status === 200) {
          if (e?.data?.user_id === "User not found") {
            toast.error("user does not exists, contact site administrator");
          } else {
            SetUserId("userId", e?.data?.user_id);
            const result = {
              user: {
                profile: {
                  username: email,
                  firstName: user.profile.firstName,
                  lastName: user.profile.lastName,
                },
              },
            };
            SetOktaAuthData("auth", result);
            navigate("/dashboard");
            toast.success("User login successfully");
          }
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return <>{loading ? <Loader /> : null}</>;
};
export default LoginVerify;
