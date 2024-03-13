import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Vegies from "./Vegies";
import RecommendedDivider from "./HrLineInBetween";
import List from "./List";
import NonVegies from "./NonVegies";
import Customize from "./Customize";
import PlaceCustomOrder from "./placecustomorder";

const DashboardUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const { email, name } = location.state || {};
  const navigate = useNavigate();
  const buffer = 50;

  const [activeSection, setActiveSection] = useState(null);
  const vegiesRef = useRef(null);
  const nonVegiesRef = useRef(null);
  const customizeRef = useRef(null);

  const validUser = async () => {
    let token = localStorage.getItem("userDataToken");
    const res = await fetch("/api/validuser", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    if (data.status === 401 || !data) {
      navigate("../*");
      console.log("user not verify");
    } else {
      console.log("user verify with status ", data.status);
    }
  };

  useEffect(() => {
    validUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vegiesRefTop = vegiesRef.current ? vegiesRef.current.offsetTop : 0;
      const nonVegiesRefTop = nonVegiesRef.current
        ? nonVegiesRef.current.offsetTop
        : 0;
      const customizeRefTop = customizeRef.current
        ? customizeRef.current.offsetTop
        : 0;

      if (scrollY < vegiesRefTop - buffer) {
        setActiveSection(null);
      } else if (scrollY < nonVegiesRefTop - buffer) {
        setActiveSection("veggies");
      } else if (scrollY < customizeRefTop - buffer) {
        setActiveSection("nonVeggies");
      } else {
        setActiveSection("customize");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [vegiesRef, nonVegiesRef, customizeRef]);

  const handleSectionClick = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [selectedSize, setSelectedSize] = useState("regular");
  const [selectedCrust, setSelectedCrust] = useState("New Hand Tossed");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState([]);
  const [extracheesed, setExtraCheesed] = useState(false);
  const [selectedCheeses, setSelectedCheeses] = useState([]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleCrustClick = (size) => {
    setSelectedCrust(size);
  };

  const handleAddCheese = () => {
    setExtraCheesed(!extracheesed);
  };

  const toggleSauce = (item) => {
    setSelectedSauce((prevSelectedSauce) => {
      if (prevSelectedSauce.includes(item)) {
        return prevSelectedSauce.filter((sauce) => sauce !== item);
      } else {
        return [...prevSelectedSauce, item];
      }
    });
  };

  const toggleTopping = (item) => {
    setSelectedToppings((prevSelectedTopping) => {
      if (prevSelectedTopping.includes(item)) {
        return prevSelectedTopping.filter((topping) => topping !== item);
      } else {
        return [...prevSelectedTopping, item];
      }
    });
  };

  const toggleCheese = (item) => {
    setSelectedCheeses((prevSelectedCheese) => {
      if (prevSelectedCheese.includes(item)) {
        return prevSelectedCheese.filter((cheese) => cheese !== item);
      } else {
        return [...prevSelectedCheese, item];
      }
    });
  };

  return (
    <div>
      <div className="sticky">
        <Navbar name={name} email={email} />
        <List
          activeSection={activeSection}
          onVegiesClick={() => handleSectionClick(vegiesRef)}
          onNonVegiesClick={() => handleSectionClick(nonVegiesRef)}
          onCustomizeClick={() => handleSectionClick(customizeRef)}
        />
      </div>
      <RecommendedDivider name="Recommended Veggies" ref={vegiesRef} />
      <Vegies />
      <RecommendedDivider name="Recommended Non-Veggies" ref={nonVegiesRef} />
      <NonVegies />
      <RecommendedDivider name="Customize Yourself" ref={customizeRef} />
      <div className="custom">
        <Customize
          selectedSize={selectedSize}
          selectedCrust={selectedCrust}
          extracheesed={extracheesed}
          selectedSauce={selectedSauce}
          selectedCheeses={selectedCheeses}
          selectedToppings={selectedToppings}
          handleAddCheese={handleAddCheese}
          handleSizeClick={handleSizeClick}
          toggleSauce={toggleSauce}
          toggleTopping={toggleTopping}
          toggleCheese={toggleCheese}
          handleCrustClick={handleCrustClick}
        />
        <div
          className={`${
            activeSection === "customize" ? "stickyPlaceOrder" : ""
          }`}
        >
          <PlaceCustomOrder
            selectedSize={selectedSize}
            selectedCrust={selectedCrust}
            extracheesed={extracheesed}
            selectedSauce={selectedSauce}
            selectedCheeses={selectedCheeses}
            selectedToppings={selectedToppings}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
