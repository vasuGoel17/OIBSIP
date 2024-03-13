import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../images/image2.png";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/resetpass?email=${email}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 404 || !data) {
      alert(data.error);
      console.log("invalid login");
    } else {
      setFlag(true);
    }
  };

  return (
    <div className="main">
      <div className="loginmain">
        <div className="loginleft">
          <img src={image1} className="loginimage" />
        </div>
        <div className="loginright" id="formLog">
          <div>
            <h1>Forgot Your Password?</h1>
          </div>

          {flag ? (
            <p style={{ margin: "1rem 2rem" }}>
              Password reset link has been send to your Email id
            </p>
          ) : (
            <div>
              <form className="reg" method="post" onSubmit={handleSubmit}>
                <div className="first">
                  <p>
                    Fear not. We’ll email you instructions to reset your
                    password.
                  </p>
                  <div className="forErr">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Your Email Id"
                      required
                    />
                  </div>
                </div>

                <button className="btnLogin" type="submit">
                  Reset
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
