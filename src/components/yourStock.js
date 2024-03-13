import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import socketIOClient from "socket.io-client";

const YourStock = () => {
  // Assuming you have data for bases like this

  const [socket, setSocket] = useState(null);

  const baseStockData = [
    { name: "Regular", quantity: 30 },
    { name: "Medium", quantity: 30 },
    { name: "Large", quantity: 30 },
  ];

  const cheeseStockData = [
    { name: "asiago cheese", quantity: 30 },
    { name: "groud cheese", quantity: 30 },
    { name: "mozzarella cheese", quantity: 30 },
    { name: "parmesan cheese", quantity: 30 },
    { name: "Provolone Cheese", quantity: 30 },
  ];

  const toppingStockData = [
    { name: "Paneer", quantity: 30 },
    { name: "Bellpepper", quantity: 30 },
    { name: "Corn", quantity: 30 },
    { name: "Mushroom", quantity: 30 },
    { name: "Olives", quantity: 30 },
    { name: "Spinach", quantity: 30 },
    { name: "Onions", quantity: 30 },
    { name: "Tomatoes", quantity: 30 },
  ];

  const sauceStockData = [
    { name: "BBQ Sauce", quantity: 30 },
    { name: "Tomato Sauce", quantity: 30 },
    { name: "Olive Sauce", quantity: 30 },
    { name: "Pesto Sauce", quantity: 30 },
    { name: "White Sauce", quantity: 30 },
  ];

  const extraStock = [
    { name: "Mayonese", quantity: 30 },
    { name: "extraCheese", quantity: 30 },
  ];

  const [stockData, setStockData] = useState({
    cheese: [],
    sauces: [],
    toppings: [],
    base: [],
    extra: [],
  });

  const fetchStockData = async () => {
    try {
      const response = await fetch("/api/stock"); // Adjust the API endpoint
      const data = await response.json();
      console.log("cdsds: ", data.stock[0]);
      setStockData({
        cheese: data.stock[0].cheese,
        sauces: data.stock[0].sauces,
        toppings: data.stock[0].toppings,
        base: data.stock[0].base,
        extra: [data.stock[0].mayo[0], data.stock[0].extraCheese[0]],
      }); // Assuming the backend returns an object with a 'stock' property
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = socketIOClient("http://localhost:3000"); // Update the URL accordingly
    setSocket(socket);

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Listen for the 'orderDeleted' event and update UI
    if (socket) {
      socket.on("stockUpdated", () => {
        console.log(`stock changed.`);
        fetchStockData();
        // Implement logic to update your UI accordingly
      });
    }
  }, [socket]);

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <div className="pizzavegi" style={{ paddingBottom: "1rem" }}>
      <div className="baseStock">
        <h2>Bases</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Base Size</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockData.base.length === 0 ? (
                <></>
              ) : (
                stockData.base.map((base) => (
                  <TableRow key={base.name}>
                    <TableCell>{base.name}</TableCell>
                    <TableCell
                      style={{ color: base.quantity < 20 ? "red" : "black" }}
                    >
                      {base.quantity}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="baseStock">
        <h2>Cheeses</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Different Cheese</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockData.cheese.length === 0 ? (
                <></>
              ) : (
                stockData.cheese.map((base) => (
                  <TableRow key={base.name}>
                    <TableCell>{base.name}</TableCell>
                    <TableCell
                      style={{ color: base.quantity < 20 ? "red" : "black" }}
                    >
                      {base.quantity}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="baseStock">
        <h2>Sauces</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Different Sauces</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockData.sauces.length === 0 ? (
                <></>
              ) : (
                stockData.sauces.map((base) => (
                  <TableRow key={base.name}>
                    <TableCell>{base.name}</TableCell>
                    <TableCell
                      style={{ color: base.quantity < 20 ? "red" : "black" }}
                    >
                      {base.quantity}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="baseStock">
        <h2>Toppings</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Different Toppings</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockData.toppings.length === 0 ? (
                <></>
              ) : (
                stockData.toppings.map((base) => (
                  <TableRow key={base.name}>
                    <TableCell>{base.name}</TableCell>
                    <TableCell
                      style={{ color: base.quantity < 20 ? "red" : "black" }}
                    >
                      {base.quantity}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="baseStock">
        <h2>Others</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Others</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockData.extra.length === 0 ? (
                <></>
              ) : (
                stockData.extra.map((base) => (
                  <TableRow key={base.name}>
                    <TableCell>{base.name}</TableCell>
                    <TableCell
                      style={{ color: base.quantity < 20 ? "red" : "black" }}
                    >
                      {base.quantity}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default YourStock;
