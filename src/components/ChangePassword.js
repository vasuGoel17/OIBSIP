import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../images/image2.png";

const ChangePassword = () => {
  const [flag, setFlag] = useState(false);
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
    const res = await fetch("/api/Password", {
      method: "put",
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
      setFlag(true);
      console.log("ok");
      // localStorage.setItem("name", data.result.userValid.name);
      // localStorage.setItem("email", data.result.userValid.email);
      // navigate("/imglogin");
    }
  };

  let navigate = useNavigate();

  return (
    <div className="main">
      <div className="loginmain">
        <div className="loginleft">
          <img src={image1} className="loginimage" />
        </div>
        <div className="loginright" id="formLog">
          <div>
            <h1>Change Password</h1>
          </div>
          <div>
            {flag ? (
              <div>
                <p>Password has Changed Successfully</p>
                <a href="http://localhost:3000/">Go Back</a>
              </div>
            ) : (
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
                      placeholder="Your new Password"
                      autoComplete="on"
                      required
                    />
                  </div>
                </div>

                <button className="btnLogin" type="submit">
                  Change
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
