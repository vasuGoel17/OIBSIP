import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../images/image2.png";

const AddStock = () => {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/stock`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const data = await res.json();
    if (res.status === 404 || !data) {
      alert(data.msg);
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
            <h1>Update Stock</h1>
          </div>
          {flag ? (
            <div className="first">
              <h2>Stock has filled up again </h2>
            </div>
          ) : (
            <div>
              <form className="reg" method="post" onSubmit={handleSubmit}>
                <div className="first">
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
                  Add more
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStock;
