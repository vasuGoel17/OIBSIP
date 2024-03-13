import React from "react";

const ListAdmin = ({
  activeSection,
  onCurrentOrdersClick,
  onYourStockClick,
}) => {
  return (
    <div className="list-container">
      <button
        className={`list-button ${
          activeSection === "currentOrders" ? "active" : ""
        }`}
        onClick={onCurrentOrdersClick}
      >
        Current Orders
      </button>
      <button
        className={`list-button ${
          activeSection === "yourStock" ? "active" : ""
        }`}
        onClick={onYourStockClick}
      >
        Your Stock
      </button>
    </div>
  );
};

export default ListAdmin;
