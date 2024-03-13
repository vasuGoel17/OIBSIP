import React from "react";
import PizzaCard from "./PizzaCard";

const NonVegies = () => {
  const pizzas = [
    {
      name: "Pepper Barbecue Chicken",
      photo: "PepperBarbequeChickenC.jpg",
      priceForSmall: "₹249",
      prizeForMedium: "₹449",
      prizeForLarge: "₹669",
      description: "Pepper barbecue chicken for that extra zing.",
      ingredients: ["mozzarellaCheese", "WhiteSauce", "Chicken"],
    },
    {
      name: "Indi Chicken Tikka",
      photo: "indiChickenTikka.jpg",
      priceForSmall: "₹359",
      prizeForMedium: "₹599",
      prizeForLarge: "₹919",
      description:
        "The wholesome flavour of tandoori masala with Chicken tikka, onion, red paprika & mint mayo.",
      ingredients: [
        "mozzarellaCheese",
        "WhiteSauce",
        "Mayonnaise",
        "Chicken",
        "Onions",
        "Bellpepper",
      ],
    },
    {
      name: "Chicken Sausage",
      photo: "chicken-sausage.png",
      priceForSmall: "₹199",
      prizeForMedium: "₹369",
      prizeForLarge: "₹599",
      description: "American classic! Spicy, herbed chicken sausage on pizza.",
      ingredients: ["mozzarellaCheese", "WhiteSauce", "Chicken"],
    },
    {
      name: "Chicken Golden Delight",
      photo: "Chicken_Golden_Delight.jpg",
      priceForSmall: "₹309",
      prizeForMedium: "₹559",
      prizeForLarge: "₹829",
      description:
        "Double pepper barbecue chicken, golden corn and extra cheese, true delight.",
      ingredients: [
        "mozzarellaCheese",
        "WhiteSauce",
        "Chicken",
        "Corn",
        "Bellpepper",
      ],
    },
    {
      name: "Chicken Fiesta",
      photo: "chickenFiesta.jpg",
      priceForSmall: "₹309",
      prizeForMedium: "₹559",
      prizeForLarge: "₹829",
      description:
        "Grilled chicken rashers, peri-peri chicken, onion & capsicum, a complete fiesta.",
      ingredients: [
        "mozzarellaCheese",
        "WhiteSauce",
        "Chicken",
        "Onions",
        "Bellpepper",
      ],
    },
    {
      name: "Non Veg Supreme",
      photo: "nonvegsupreme.webp",
      priceForSmall: "₹359",
      prizeForMedium: "₹599",
      prizeForLarge: "₹919",
      description:
        "Supreme combination of black olives, onion, capsicum, grilled mushroom, pepper barbecue chicken, peri-peri.",
      ingredients: [
        "mozzarellaCheese",
        "TomatoSauce",
        "Chicken",
        "Mushroom",
        "Onions",
        "Bellpepper",
        "Olives",
        "Paneer",
        "Corn",
      ],
    },
    {
      name: "Non Veg Loaded",
      photo: "nonvegloaded.jpg",
      priceForSmall: "₹199",
      prizeForMedium: "₹299",
      prizeForLarge: "₹499",
      description:
        "Chicken sausage, pepper barbecue chicken & peri-peri chicken in a fresh pan crust.",
      ingredients: [
        "mozzarellaCheese",
        "TomatoSauce",
        "Chicken",
        "Olives",
        "Mushroom",
        "Bellpepper",
      ],
    },
  ];

  return (
    <div className="pizzaVeg">
      {pizzas.map((pizza, index) => {
        return (
          <PizzaCard
            key={index}
            name={pizza.name}
            type="nonVegPizza"
            priceForSmall={pizza.priceForSmall}
            priceForMedium={pizza.prizeForMedium}
            priceForLarge={pizza.prizeForLarge}
            description={pizza.description}
            photo={pizza.photo}
            ingredients={pizza.ingredients}
          />
        );
      })}
    </div>
  );
};

export default NonVegies;
