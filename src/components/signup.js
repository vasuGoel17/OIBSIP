import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../images/image2.png";

const Signup = () => {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [checkOtp, setcheckOpt] = useState();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleChangeotp = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = values;

    const res = await fetch(`/api/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    const data = await res.json();
    if (res.status === 404 || !data) {
      alert(data.msg);
      console.log("invalid login");
    } else {
      setFlag(true);
      setcheckOpt(data.otp);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    // console.log("entered otp ", otp);
    const { name, email, password } = values;

    if (otp == checkOtp) {
      const res = await fetch(`/api/matchotp`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      if (res.status === 404 || !data) {
        alert(data.msg);
        console.log("invalid login");
      } else {
        alert("Signup Successfull");
        setValues({
          name: "",
          email: "",
          password: "",
        });
        setFlag(false);
      }
    } else {
      alert("OTP not matching");
    }
  };

  const routeChangeToLogin = () => {
    let path = `../`;
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
            <h1>Sign Up</h1>
          </div>
          <div>
            {flag ? (
              <div>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={handleChangeotp}
                  placeholder="OTP recieved on your entered Email"
                  required
                />
                <button className="btnLogin" onClick={handleOtpSubmit}>
                  Sign up
                </button>
              </div>
            ) : (
              <form className="reg" method="post" onSubmit={handleSubmit}>
                <div className="first">
                  <div className="forErr">
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>

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
                  Sign up
                </button>
              </form>
            )}

            <div className="changeToButtons">
              <div className="ChangeToSignup">
                Already have an account?{" "}
                <button className="btntrans pl2" onClick={routeChangeToLogin}>
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
