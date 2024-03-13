// import React from "react";

// const List = ({
//   activeSection,
//   onVegiesClick,
//   onNonVegiesClick,
//   onCustomizeClick,
// }) => {
//   return (
//     <div className="list-container">
//       <button
//         className={activeSection === "veggies" ? "active" : ""}
//         onClick={onVegiesClick}
//       >
//         Veggies
//       </button>
//       <button
//         className={activeSection === "nonVeggies" ? "active" : ""}
//         onClick={onNonVegiesClick}
//       >
//         Non-Veggies
//       </button>
//       <button
//         className={activeSection === "customize" ? "active" : ""}
//         onClick={onCustomizeClick}
//       >
//         Customize
//       </button>
//     </div>
//   );
// };

// export default List;
import React from "react";
// import "./List.css"; // Import the CSS file for styling

const List = ({
  activeSection,
  onVegiesClick,
  onNonVegiesClick,
  onCustomizeClick,
}) => {
  return (
    <div className="list-container">
      <button
        className={`list-button ${activeSection === "veggies" ? "active" : ""}`}
        onClick={onVegiesClick}
      >
        Recommended Veggies
      </button>
      <button
        className={`list-button ${
          activeSection === "nonVeggies" ? "active" : ""
        }`}
        onClick={onNonVegiesClick}
      >
        Recommended Non-Veggies
      </button>
      <button
        className={`list-button ${
          activeSection === "customize" ? "active" : ""
        }`}
        onClick={onCustomizeClick}
      >
        Customize Yourself
      </button>
    </div>
  );
};

export default List;
