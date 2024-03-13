import React, { useContext, useState } from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import AppContext from "../context/AppContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Placecustomorder = ({
  selectedSize,
  selectedCrust,
  extracheesed,
  selectedSauce,
  selectedCheeses,
  selectedToppings,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { cart, setCart } = useContext(AppContext);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const calculateTotalPrice = (
    selectedSize,
    selectedCrust,
    extracheesed,
    selectedSauce,
    selectedCheeses,
    selectedToppings
  ) => {
    let crust = baseCrusts.find((item) => item.name === selectedCrust);
    let money = 0;
    if (selectedSize === "regular") {
      money = parseInt(crust.priceReg.replace("₹", ""), 10);
    } else if (selectedSize === "medium") {
      money = parseInt(crust.priceMed.replace("₹", ""), 10);
    } else {
      money = parseInt(crust.priceLarge.replace("₹", ""), 10);
    }

    let cheese = 0;
    if (extracheesed && selectedSize === "regular") {
      cheese = 50;
    } else if (extracheesed && selectedSize === "medium") {
      cheese = 75;
    } else if (extracheesed && selectedSize === "large") {
      cheese = 95;
    }
    let totalMoney =
      selectedToppings.length * 35 +
      selectedSauce.length * 50 +
      selectedCheeses.length * 50 +
      cheese +
      money;
    return totalMoney;
  };

  const baseCrusts = [
    {
      name: "New Hand Tossed",
      priceReg: "₹100",
      priceMed: "₹150",
      priceLarge: "₹200",
    },
    {
      name: "100% Wheat Thin Crust",
      priceReg: "₹120",
      priceMed: "₹180",
      priceLarge: "₹250",
    },
    {
      name: "Cheese Burst",
      priceReg: "₹150",
      priceMed: "₹250",
      priceLarge: "₹320",
    },
    {
      name: "Fresh Pan Pizza",
      priceReg: "₹120",
      priceMed: "₹180",
      priceLarge: "₹250",
    },
    {
      name: "Classic Hand Tossed",
      priceReg: "₹100",
      priceMed: "₹150",
      priceLarge: "₹200",
    },
  ];

  const handleAddToCart = () => {
    setSnackbarOpen(true);

    const newItem = {
      name: "customized Pizza",
      baseSize: selectedSize,
      count: 1,
      description: `${selectedSauce.sort().join(",")},${selectedCheeses
        .sort()
        .join(",")},${selectedToppings.sort().join(",")}${
        extracheesed ? ",extraCheesed" : ""
      }`,
      price: calculateTotalPrice(
        selectedSize,
        selectedCrust,
        extracheesed,
        selectedSauce,
        selectedCheeses,
        selectedToppings
      ),
    };

    // Check if an item with the same name, base size, and description already exists in the cart
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.name === newItem.name &&
        item.baseSize === newItem.baseSize &&
        item.description === newItem.description
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
  };

  // console.log("c: ", cart);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }} id="custom">
      <Typography variant="h4" gutterBottom id="customHeading">
        Custom Order
      </Typography>

      <Typography variant="h6" gutterBottom>
        Selected Size: {selectedSize}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Selected Crust: {selectedCrust}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Extra Cheese: {extracheesed ? "Yes" : "No"}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Selected Sauces: {selectedSauce.join(", ")}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Selected Cheeses: {selectedCheeses.join(", ")}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Selected Toppings: {selectedToppings.join(", ")}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Total Price: ₹
        {calculateTotalPrice(
          selectedSize,
          selectedCrust,
          extracheesed,
          selectedSauce,
          selectedCheeses,
          selectedToppings
        )}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToCart}
        style={{ width: "10rem", margin: "0rem auto 1rem" }}
      >
        Add to Cart
      </Button>

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
    </Container>
  );
};

export default Placecustomorder;
