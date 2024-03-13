import React, { useState, useEffect, useContext } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AppContext from "../context/AppContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const PizzaCard = ({
  name,
  type,
  priceForSmall,
  priceForMedium,
  ingredients,
  priceForLarge,
  description,
  photo,
}) => {
  const imagePath = require(`../images/${type}/${photo}`);
  const [rate, setRate] = useState(priceForSmall);
  const [count, setCount] = useState(0);
  const [baseSize, setBaseSize] = useState("regular");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { cart, setCart } = useContext(AppContext);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  const handleChange = (event) => {
    setBaseSize(event.target.value);
    setCount(0);
    if (baseSize === "regular") {
      setRate(priceForSmall);
    } else if (baseSize === "medium") {
      setRate(priceForMedium);
    } else {
      setRate(priceForLarge);
    }
  };

  const handleAddToCart = () => {
    // Add your logic to add the pizza to the cart
    // You can use an external state or a global state management library like Redux
    // console.log(`Added ${count} ${name}(s) to the cart of size ${baseSize}!`);

    if (count > 0) {
      let price = parseInt(rate.replace("₹", ""), 10);
      const newItem = {
        name: name,
        baseSize: baseSize, // You can replace this with your actual base size logic
        count: count,
        ingredients: ingredients,
        description: description,
        price: price, // Calculate the price based on your logic
      };

      // Check if an item with the same name and base size already exists in the cart
      const existingItemIndex = cart.findIndex(
        (item) =>
          item.name === newItem.name && item.baseSize === newItem.baseSize
      );

      if (existingItemIndex !== -1) {
        // If the item exists, update the count
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].count += newItem.count;
        setCart(updatedCart);
      } else {
        // If the item doesn't exist, add it to the cart
        setCart((prevCart) => [...prevCart, newItem]);
      }

      setSnackbarOpen(true);
    }
  };

  // console.log("cart: ", cart);

  return (
    <div className="pizza-card">
      <img
        src={imagePath}
        alt={imagePath}
        height="40%"
        width="100%"
        className="pizza-photo"
      />
      <div className="pizza-details">
        <div className="pizzaname">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>

        <hr />

        <div className="pizzatype">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Base Size
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={baseSize}
              onChange={handleChange}
              label="Base Size"
            >
              <MenuItem value="regular">Regular</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>

          {baseSize === "regular" ? (
            <p className="pizza-price">{priceForSmall}</p>
          ) : baseSize === "medium" ? (
            <p className="pizza-price">{priceForMedium}</p>
          ) : (
            <p className="pizza-price">{priceForLarge}</p>
          )}
        </div>

        <div className="pizzaAdd">
          <div
            className="pizzaAdd pizzaQuantity"
            style={{ display: "flex", alignItems: "center" }}
          >
            <IconButton
              onClick={handleDecrement}
              sx={{ borderRight: "1px solid #ccc" }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography
              variant="body1"
              sx={{ minWidth: "30px", textAlign: "center" }}
            >
              {count}
            </Typography>
            <IconButton
              onClick={handleIncrement}
              sx={{ borderLeft: "1px solid #ccc" }}
            >
              <AddIcon />
            </IconButton>
          </div>
          <button onClick={handleAddToCart} className="addcart">
            Add to Cart
          </button>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MuiAlert
              elevation={12}
              variant="filled"
              onClose={handleSnackbarClose}
              severity="success"
            >
              Item successfully added to cart!
            </MuiAlert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
