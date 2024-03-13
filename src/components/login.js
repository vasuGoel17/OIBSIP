import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../images/image2.png";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    const res = await fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    if (res.status === 404 || !data) {
      alert(data.msg);
      console.log("invalid login");
    } else {
      // console.log(data.result.token);
      localStorage.setItem("userDataToken", data.result.token);
      let email = data.result.userValid.email;
      let name = data.result.userValid.name;
      if (data.result.user === "user") {
        navigate(`/userDashboard/${data.result.userValid._id}`, {
          state: { email, name },
        });
      } else {
        navigate(`/adminDashboard/${data.result.userValid._id}`, {
          state: { email, name },
        });
      }
    }
  };

  let navigate = useNavigate();
  const routeChangeToSignup = () => {
    let path = `../signup`;
    navigate(path);
  };

  const changeRouteToResetPassword = () => {
    let path = `../resetPassword`;
    navigate(path);
  };

  return (
    <div className="main">
      <div className="loginmain">
        <div className="loginleft">
          <img src={image1} className="loginimage" />
        </div>
        <div className="loginright" id="formLog">
          <div>
            <h1>Login</h1>
          </div>
          <div>
            <form className="reg" method="post" onSubmit={handleSubmit}>
              <div className="first">
                <div className="forErr">
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Your Email Id"
                    required
                  />
                </div>

                <div className="forErr">
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Your Password"
                    autoComplete="on"
                    required
                  />
                </div>
              </div>

              <button className="btnLogin" type="submit">
                Login
              </button>
            </form>

            <div className="changeToButtons">
              <div className="ChangeToSignup">
                Don't have an account?{" "}
                <button className="btntrans pl2" onClick={routeChangeToSignup}>
                  Sign Up
                </button>
              </div>

              <button onClick={changeRouteToResetPassword} className="btntrans">
                Forgot Your password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
