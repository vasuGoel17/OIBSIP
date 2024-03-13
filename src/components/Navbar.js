import React, { useState, useContext } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar, Button, Popover, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AppContext from "../context/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].count += 1;
    setCart(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].count = Math.max(updatedCart[index].count - 1, 0);
    setCart(updatedCart);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("userDataToken");
    const res = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    if (data.status == 200) {
      localStorage.removeItem("userDataToken");
      navigate("/");
    } else {
      console.log("error");
    }
  };

  const handleDelete = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    navigate(`./yourOrder`, {
      state: { email: props.email, name: props.name },
    });
  };

  const totalMoney = cart.reduce(
    (total, cartt) => total + cartt.price * cartt.count,
    0
  );

  return (
    <div className="navbar">
      <div className="navleft">
        <p style={{ fontFamily: "cursive" }}>Hello {props.name}</p>
      </div>
      <div className="navright">
        {props.email === "goelvasu17@gmail.com" ? (
          <></>
        ) : (
          <div className="cart">
            <button
              className="btntrans"
              style={{
                color: "white",
                cursor: "pointer",
              }}
              title="view cart"
              onClick={handleButtonClick}
            >
              <ShoppingCartIcon />
            </button>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <div className="dropdownlog">
                <h2 className="dropdownheading">Your Cart</h2>
                {cart.length === 0 ? (
                  <div style={{ margin: "1rem auto" }}>
                    <h3 style={{ margin: "0rem auto" }}>
                      Your cart is empty right now
                    </h3>
                    <span>Please order something from menu.</span>
                  </div>
                ) : (
                  cart.map((cartt, index) => {
                    return (
                      <div className="cartt" key={index}>
                        <div className="cartHead">
                          <h3 className="catth3">{cartt.name}</h3>
                          <span className="catth3">{cartt.baseSize}</span>
                        </div>

                        <p className="cattp">{cartt.description}</p>
                        <div className="pizzaAdd" id="pizzaAdd">
                          <div
                            className="pizzaAdd pizzaQuantity"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {cartt.count === 1 ? (
                              <IconButton
                                onClick={() => handleDelete(index)}
                                sx={{ borderRight: "1px solid #ccc" }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => handleDecrement(index)}
                                sx={{ borderRight: "1px solid #ccc" }}
                              >
                                <RemoveIcon />
                              </IconButton>
                            )}
                            <Typography
                              variant="body1"
                              sx={{ minWidth: "30px", textAlign: "center" }}
                            >
                              {cartt.count}
                            </Typography>
                            <IconButton
                              onClick={() => handleIncrement(index)}
                              sx={{ borderLeft: "1px solid #ccc" }}
                            >
                              <AddIcon />
                            </IconButton>
                          </div>
                          <span className="carttprice">
                            ₹{cartt.price * cartt.count}
                          </span>
                        </div>
                        <hr className="cartthr" />
                      </div>
                    );
                  })
                )}
              </div>
              <div className="dropdownbtn">
                <div className="cartSubtotal">
                  <h2>Sub Total</h2>
                  <h2>₹{totalMoney}</h2>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCheckout}
                  style={{ width: "100%", margin: "0rem auto 1rem" }}
                >
                  Checkout
                </Button>
              </div>
            </Popover>
          </div>
        )}

        <div className="logout">
          <button
            className="btntrans"
            style={{
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleLogout}
            title="Logout"
          >
            <ExitToAppIcon />
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default Navbar;
