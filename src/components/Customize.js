import React, { useState } from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import Slider from "react-slick";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import smallPizza from "../images/4pieces.png";
import mediumPizza from "../images/6pieces.png";
import largePizza from "../images/8pieces.png";

import bbqSauce from "../images/sauces/barbecue.jpg";
import tomatoSauce from "../images/sauces/classicTomato.jpg";
import oliveSauce from "../images/sauces/Olive-Tapenade.jpg";
import pestoSauce from "../images/sauces/Pesto.jpg";
import whiteSauce from "../images/sauces/WhiteSauce.jpg";

import asiago from "../images/cheese/asiago.jpg";
import groud from "../images/cheese/groud.jpg";
import mozzarella from "../images/cheese/mozzarella.jpg";
import parmesan from "../images/cheese/parmesan.jpg";
import provolone from "../images/cheese/provolone.jpg";

import paneer from "../images/toppings/paneer.png";
import bellpepper from "../images/toppings/bellPepper.jpg";
import corn from "../images/toppings/corn.jpg";
import mushroom from "../images/toppings/mushrooms.jpg";
import olives from "../images/toppings/olives.jpg";
import spinach from "../images/toppings/spinach.jpg";
import onions from "../images/toppings/onions.jpg";
import tomatoes from "../images/toppings/tomatos.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Customize = ({
  selectedSize,
  selectedCrust,
  extracheesed,
  selectedSauce,
  selectedCheeses,
  selectedToppings,
  handleAddCheese,
  handleSizeClick,
  toggleSauce,
  toggleTopping,
  toggleCheese,
  handleCrustClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const toppings = [
    { id: 1, name: "Paneer", image: paneer },
    { id: 2, name: "Bellpepper", image: bellpepper },
    { id: 3, name: "Corn", image: corn },
    { id: 4, name: "Mushroom", image: mushroom },
    { id: 5, name: "Olives", image: olives },
    { id: 6, name: "Spinach", image: spinach },
    { id: 7, name: "Onions", image: onions },
    { id: 8, name: "Tomatoes", image: tomatoes },
  ];

  const cheeses = [
    { id: 1, name: "asiago cheese", image: asiago, givenName: "asiagoCheese" },
    { id: 2, name: "groud cheese", image: groud, givenName: "groudCheese" },
    {
      id: 3,
      name: "mozzarella cheese",
      image: mozzarella,
      givenName: "mozzarellaCheese",
    },
    {
      id: 4,
      name: "parmesan cheese",
      image: parmesan,
      givenName: "parmesanCheese",
    },
    {
      id: 5,
      name: "Provolone Cheese",
      image: provolone,
      givenName: "ProvoloneCheese",
    },
  ];

  const sauces = [
    { id: 1, name: "BBQ Sauce", image: bbqSauce, givenName: "BBQSauce" },
    {
      id: 2,
      name: "Tomato Sauce",
      image: tomatoSauce,
      givenName: "TomatoSauce",
    },
    { id: 3, name: "Olive Sauce", image: oliveSauce, givenName: "OliveSauce" },
    { id: 4, name: "Pesto Sauce", image: pestoSauce, givenName: "PestoSauce" },
    { id: 5, name: "White Sauce", image: whiteSauce, givenName: "WhiteSauce" },
  ];

  const baseSizes = [
    { id: 1, name: "regular", image: smallPizza },
    { id: 2, name: "medium", image: mediumPizza },
    { id: 3, name: "large", image: largePizza },
  ];

  const baseCrusts = [
    {
      id: 1,
      name: "New Hand Tossed",
      priceReg: "₹100",
      priceMed: "₹150",
      priceLarge: "₹200",
    },
    {
      id: 2,
      name: "100% Wheat Thin Crust",
      priceReg: "₹120",
      priceMed: "₹180",
      priceLarge: "₹250",
    },
    {
      id: 3,
      name: "Cheese Burst",
      priceReg: "₹150",
      priceMed: "₹250",
      priceLarge: "₹320",
    },
    {
      id: 4,
      name: "Fresh Pan Pizza",
      priceReg: "₹120",
      priceMed: "₹180",
      priceLarge: "₹250",
    },
    {
      id: 5,
      name: "Classic Hand Tossed",
      priceReg: "₹100",
      priceMed: "₹150",
      priceLarge: "₹200",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }} id="custom">
      <Typography variant="h4" gutterBottom id="customHeading">
        Build Your Custom Pizza
      </Typography>

      <div className="customPizzaType">
        <Typography variant="h5" gutterBottom>
          Choose Pizza Size
        </Typography>

        <Box display="flex" justifyContent="space-between">
          {baseSizes.map((baseSize) => (
            <Button
              key={baseSize.id}
              variant={
                selectedSize === baseSize.name ? "contained" : "outlined"
              }
              color="primary"
              onClick={() => handleSizeClick(baseSize.name)}
              value={baseSize.name}
            >
              <img
                src={baseSize.image}
                alt={baseSize.name}
                width="60rem"
                height="60rem"
              />
              <span style={{ marginLeft: "0.6rem" }}>{baseSize.name}</span>
            </Button>
          ))}
        </Box>
      </div>

      <div className="customPizzaType">
        <Typography variant="h5" gutterBottom>
          Choose Pizza Crust
        </Typography>

        <Box display="flex" justifyContent="space-between">
          {baseCrusts.map((baseCrust) => (
            <Button
              key={baseCrust.id}
              variant={
                selectedCrust === baseCrust.name ? "contained" : "outlined"
              }
              color="primary"
              onClick={() => handleCrustClick(baseCrust.name)}
              value={baseCrust.name}
            >
              <div className="pizzaspan">
                <span style={{ marginLeft: "0.6rem" }} value="small">
                  {baseCrust.name}
                </span>
                <span className="pizzarate">
                  {selectedSize === "regular"
                    ? baseCrust.priceReg
                    : selectedSize === "medium"
                    ? baseCrust.priceMed
                    : baseCrust.priceLarge}
                </span>
              </div>
            </Button>
          ))}
        </Box>
      </div>

      <div className="customPizzaType">
        <Typography variant="h5" gutterBottom>
          Add Extra Cheese
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <div className="addCheese">
            <span>
              {extracheesed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
            </span>

            <span style={{ fontSize: "1.5rem" }} id="addcheesepara">
              I want to add extra cheese
            </span>
            <span className="pizzarate" id="addcheeserate">
              {selectedSize === "regular"
                ? "₹50"
                : selectedSize === "medium"
                ? "₹75"
                : "₹95"}
            </span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCheese}
            >
              {!extracheesed ? "ADD" : "REMOVE"}
            </Button>
          </div>
        </Box>
      </div>

      <div className="customPizzaType">
        <Typography variant="h5" gutterBottom>
          Choose Sauces @{" "}
          <span style={{ display: "inline", fontSize: "1.2rem" }}>
            ₹50 each
          </span>
        </Typography>

        <Box display="flex" justifyContent="space-between">
          {sauces.map((sauce) => (
            <Button
              key={sauce.id}
              variant={
                selectedSauce.includes(sauce.givenName)
                  ? "contained"
                  : "outlined"
              }
              color="primary"
              onClick={() => toggleSauce(sauce.givenName)}
              value={sauce.name}
            >
              <img
                src={sauce.image}
                alt={sauce.name}
                width="60rem"
                height="60rem"
              />
              <span style={{ marginLeft: "0.6rem" }}>{sauce.name}</span>
            </Button>
          ))}
        </Box>
      </div>

      <div className="customPizzaType">
        <Typography variant="h5" gutterBottom>
          Add Cheese @{" "}
          <span style={{ display: "inline", fontSize: "1.2rem" }}>
            ₹50 each
          </span>
        </Typography>

        <Box display="flex" justifyContent="space-between">
          {cheeses.map((cheese) => (
            <Button
              key={cheese.id}
              variant={
                selectedCheeses.includes(cheese.givenName)
                  ? "contained"
                  : "outlined"
              }
              color="primary"
              onClick={() => toggleCheese(cheese.givenName)}
              value={cheese.name}
            >
              <img
                src={cheese.image}
                alt={cheese.name}
                width="60rem"
                height="60rem"
              />
              <span style={{ marginLeft: "0.6rem" }}>{cheese.name}</span>
            </Button>
          ))}
        </Box>
      </div>

      <div className="customPizzaType">
        <Typography variant="h5" gutterBottom>
          Add Toppings@{" "}
          <span style={{ display: "inline", fontSize: "1.2rem" }}>
            ₹35 each
          </span>
        </Typography>

        <Container>
          <Box display="flex" alignItems="center">
            <Slider {...settings} className="btnpizza">
              {toppings.map((topping) => (
                <Button
                  key={topping.id}
                  variant={
                    selectedToppings.includes(topping.name)
                      ? "contained"
                      : "outlined"
                  }
                  color="primary"
                  onClick={() => toggleTopping(topping.name)}
                  value={topping.name}
                  className="topping"
                >
                  <img
                    src={topping.image}
                    alt={topping.name}
                    width="60rem"
                    height="60rem"
                  />
                  <span style={{ marginLeft: "0.6rem" }}>{topping.name}</span>
                </Button>
              ))}
            </Slider>
          </Box>
        </Container>
      </div>
    </Container>
  );
};

export default Customize;
