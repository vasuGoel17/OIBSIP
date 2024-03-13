import React from "react";
import PizzaCard from "./PizzaCard";

const Vegies = () => {
  const pizzas = [
    {
      name: "Margherita",
      photo: "margarita.jpg",
      priceForSmall: "₹139",
      prizeForMedium: "₹289",
      prizeForLarge: "₹399",
      description:
        "Classic margherita pizza with fresh tomatoes and mozzarella.",
      ingredients: [
        "mozzarellaCheese",
        "parmesanCheese",
        "TomatoSauce",
        "Tomatoes",
      ],
    },
    {
      name: "Veggie Paradise",
      photo: "VeggiParadise.jpg",
      priceForSmall: "₹259",
      prizeForMedium: "₹459",
      prizeForLarge: "₹689",
      description:
        "The awesome foursome! Golden corn, black olives, capsicum, red paprika.",
      ingredients: [
        "mozzarellaCheese",
        "parmesanCheese",
        "TomatoSauce",
        "Mushroom",
        "Onions",
        "Bellpepper",
        "Olives",
        "Spinach",
        "Corn",
      ],
    },
    {
      name: "Peppy Paneer",
      photo: "Peppy_Paneer.jpg",
      priceForSmall: "₹259",
      prizeForMedium: "₹459",
      prizeForLarge: "₹689",
      description:
        "Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika.",
      ingredients: [
        "mozzarellaCheese",
        "TomatoSauce",
        "Onions",
        "Paneer",
        "Bellpepper",
        "Corn",
      ],
    },
    {
      name: "Paneer Makhani",
      photo: "Paneer_Makhni.jpg",
      priceForSmall: "₹305",
      prizeForMedium: "₹559",
      prizeForLarge: "₹815",
      description:
        "The paneer makhani pizza from Domino’s is the perfect veg pizza for desi pizza lovers.",
      ingredients: [
        "mozzarellaCheese",
        "WhiteSauce",
        "Onions",
        "Paneer",
        "Bellpepper",
      ],
    },
    {
      name: "Mexican Green Wave",
      photo: "Mexican_Green_Wave.jpg",
      priceForSmall: "₹259",
      prizeForMedium: "₹459",
      prizeForLarge: "₹689",
      description:
        "Mexican herbs sprinkled on onion, capsicum, tomato & jalapeno.",
      ingredients: [
        "mozzarellaCheese",
        "TomatoSauce",
        "Mushroom",
        "Onions",
        "Bellpepper",
        "Olives",
        "Spinach",
        "Corn",
      ],
    },
    {
      name: "Indi Tandoori Paneer",
      photo: "IndianTandooriPaneer.jpg",
      priceForSmall: "₹299",
      prizeForMedium: "₹549",
      prizeForLarge: "₹799",
      description:
        "It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum, red paprika & mint mayo.",
      ingredients: [
        "mozzarellaCheese",
        "WhiteSauce",
        "Paneer",
        "Onions",
        "Bellpepper",
        "Mayonnaise",
        "Corn",
      ],
    },
    {
      name: "Farmhouse",
      photo: "farmhouse.jpg",
      priceForSmall: "₹259",
      prizeForMedium: "₹459",
      prizeForLarge: "₹689",
      description:
        "Delightful combination of onion, capsicum, tomato & grilled mushroom.",
      ingredients: [
        "mozzarellaCheese",
        "TomatoSauce",
        "Mushroom",
        "Onions",
        "Bellpepper",
        "Spinach",
      ],
    },
    {
      name: "Veg Extravaganza",
      photo: "Veg_Extravaganz.jpg",
      priceForSmall: "₹299",
      prizeForMedium: "₹549",
      prizeForLarge: "₹799",
      description:
        "Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese.",

      ingredients: [
        "mozzarellaCheese",
        "TomatoSauce",
        "Mushroom",
        "Onions",
        "Bellpepper",
        "Spinach",
        "Corn",
        "Olives",
      ],
    },
    {
      name: "Deluxe Veggie",
      photo: "Deluxe_Veggie.jpg",
      priceForSmall: "₹219",
      prizeForMedium: "₹385",
      prizeForLarge: "₹619",
      description:
        "For a vegetarian looking for a BIG treat that goes easy on the spices, this one's got it all.",

      ingredients: [
        "mozzarellaCheese",
        "WhiteSauce",
        "Mushroom",
        "Paneer",
        "Onions",
        "Bellpepper",
        "Corn",
      ],
    },
    {
      name: "Cheese n Corn",
      photo: "Corn_&_Cheese.jpg",
      priceForSmall: "₹209",
      prizeForMedium: "₹379",
      prizeForLarge: "₹609",
      description: "A delectable combination of sweet & juicy golden corn.",
      ingredients: ["mozzarellaCheese", "WhiteSauce", "Corn"],
    },
    // Add more pizza objects with different photo names
  ];

  return (
    <div className="pizzaVeg">
      {pizzas.map((pizza, index) => {
        return (
          <PizzaCard
            key={index}
            name={pizza.name}
            type="vegPizza"
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

export default Vegies;
