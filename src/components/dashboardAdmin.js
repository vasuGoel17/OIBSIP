import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Vegies from "./Vegies";
import RecommendedDivider from "./HrLineInBetween";
import NonVegies from "./NonVegies";
import ListAdmin from "./listadmin";
import CurrentOrder from "./currentOrder";
import YourStock from "./yourStock";

const DashboardAdmin = () => {
  const { id } = useParams();
  const location = useLocation();
  const { email, name } = location.state || {};
  const navigate = useNavigate();
  const buffer = 60;

  const [activeSection, setActiveSection] = useState(null);
  const currentOrdersRef = useRef(null);
  const yourStockRef = useRef(null);

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
      const currentOrdersRefTop = currentOrdersRef.current
        ? currentOrdersRef.current.offsetTop
        : 0;
      const yourStockRefTop = yourStockRef.current
        ? yourStockRef.current.offsetTop
        : 0;

      if (scrollY < currentOrdersRefTop - buffer) {
        setActiveSection(null);
      } else if (scrollY < yourStockRefTop - buffer) {
        setActiveSection("currentOrders");
      } else {
        setActiveSection("yourStock");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentOrdersRef, yourStockRef]);

  const handleSectionClick = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="sticky">
        <Navbar name={name} email={email} />
        <ListAdmin
          activeSection={activeSection}
          onCurrentOrdersClick={() => handleSectionClick(currentOrdersRef)}
          onYourStockClick={() => handleSectionClick(yourStockRef)}
        />
      </div>
      <RecommendedDivider name="Current Orders" ref={currentOrdersRef} />
      <CurrentOrder />
      <RecommendedDivider name="Your Stock Left" ref={yourStockRef} />
      <YourStock />
    </div>
  );
};

export default DashboardAdmin;
