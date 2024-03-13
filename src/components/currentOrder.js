import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KitchenIcon from "@mui/icons-material/Kitchen";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import socketIOClient from "socket.io-client";
import Box from "@mui/material/Box";

const CurrentOrder = () => {
  const handleStatusChange = async (status, orderId) => {
    const res = await fetch("/api/orderStatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, orderId }), // Combine status and orderId into an object
    });

    const data = await res.json();
    if (data.status === 200) {
      getCurrentOrders();
    } else {
      console.log("error");
    }
  };

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCurrentOrders = async () => {
    const res = await fetch("/api/currentOrder", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    if (data.status == 200) {
      console.log(data.orders);
      setOrders(data.orders);
      setLoading(false);
    } else {
      console.log("error");
    }
  };

  const [orderId, setOrderId] = useState();
  const [socket, setSocket] = useState(null);

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
    getCurrentOrders();
  }, []);

  useEffect(() => {
    // Listen for the 'orderDeleted' event and update UI
    if (socket) {
      socket.on("orderPlaced", (placedOrderId) => {
        console.log(`Order with orderId ${placedOrderId} is placed.`);
        getCurrentOrders();
        // Implement logic to update your UI accordingly
      });

      socket.on("orderDeleted", (deletedOrderId) => {
        console.log(`Order with orderId ${deletedOrderId} has been deleted.`);
        getCurrentOrders();
        // Implement logic to update your UI accordingly
      });
    }
  }, [socket]);

  return (
    <div className="pizzavegi">
      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      <div className="currentOrder">
        {orders.length === 0 ? (
          <h1>Currently No Order is there in queue</h1>
        ) : (
          orders.map((order, index) => (
            <div className="eachOrder" key={index}>
              <span style={{ fontSize: "1.1rem" }}>
                <h3 style={{ margin: "0", display: "inline" }}>
                  {index + 1}.{" "}
                </h3>{" "}
                Order by:- <b style={{ fontSize: "1.4rem" }}>{order.name}</b> (
                {order.orderId})
              </span>

              <div className="table">
                <table>
                  <tbody>
                    {order.pizzaName.map((pizza, index) => (
                      <tr key={index}>
                        <td>{pizza.name}</td>
                        <td className="secondTD">{pizza.size}</td>
                        <td className="secondlastTD">{pizza.quantity}</td>
                        {pizza.name === "customized Pizza" ? (
                          <td className="lastTD">
                            {pizza.descriptionIfCustomize}
                          </td>
                        ) : (
                          <td className="lastTD">{pizza.decriptionIfNormal}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="iconForDelivery">
                <Box display="flex" alignItems="center">
                  <div
                    className="iconForDelLine"
                    style={{
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                      backgroundColor: order.payment
                        ? "#38d238" // Change the color based on completion status
                        : "gray",
                    }}
                  />
                  <div
                    className="iconBox"
                    style={{
                      borderColor: order.payment
                        ? "#38d238" // Change the color based on completion status
                        : "gray",
                    }}
                  >
                    <IconButton
                      className="iconbtn"
                      disabled={order.payment}
                      onClick={() =>
                        handleStatusChange("payment", order.orderId)
                      }
                      style={{
                        color: order.payment
                          ? "#38d238" // Change the color based on completion status
                          : "gray",
                        border: order.payment
                          ? "#38d238" // Change the color based on completion status
                          : "gray",
                      }}
                    >
                      <ShoppingCartIcon
                        color={order.payment ? "success" : "action"}
                      />
                      <span>Order Placed</span>
                    </IconButton>
                  </div>

                  <div
                    className="iconForDelLine"
                    style={{
                      borderRadius: "0px",
                      backgroundColor: order.inKitchen
                        ? "#38d238" // Change the color based on completion status
                        : "gray",
                    }}
                  />
                  <div
                    className="iconBox"
                    style={{
                      borderColor: order.inKitchen
                        ? "#38d238" // Change the color based on completion status
                        : "gray",
                    }}
                  >
                    <IconButton
                      className="iconbtn"
                      onClick={() =>
                        handleStatusChange("inKitchen", order.orderId)
                      }
                      disabled={order.inKitchen}
                      style={{
                        color: order.inKitchen
                          ? "#38d238" // Change the color based on completion status
                          : "gray",
                        border: order.inKitchen
                          ? "#38d238" // Change the color based on completion status
                          : "gray",
                      }}
                    >
                      <KitchenIcon
                        color={order.inKitchen ? "success" : "action"}
                      />
                      <span>In Kitchen</span>
                    </IconButton>
                  </div>

                  <div
                    className="iconForDelLine"
                    style={{
                      borderRadius: "0",
                      backgroundColor: order.sentToDelivery
                        ? "#38d238" // Change the color based on completion status
                        : "gray",
                    }}
                  />
                  <div
                    className="iconBox"
                    style={{
                      borderColor: order.sentToDelivery
                        ? "#38d238" // Change the color based on completion status
                        : "gray",
                    }}
                  >
                    <IconButton
                      className="iconbtn"
                      disabled={order.sentToDelivery}
                      onClick={() =>
                        handleStatusChange("sentToDelivery", order.orderId)
                      }
                      style={{
                        color: order.sentToDelivery
                          ? "#38d238" // Change the color based on completion status
                          : "gray",
                        border: order.sentToDelivery
                          ? "#38d238" // Change the color based on completion status
                          : "gray",
                      }}
                    >
                      <DeliveryDiningIcon
                        color={order.sentToDelivery ? "success" : "action"}
                      />
                      <span>Sent to Delivery</span>
                    </IconButton>
                  </div>
                  <div
                    className="iconForDelLine"
                    style={{
                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                      width: "40%",
                      backgroundColor: order.sentToDelivery
                        ? "#38d238" // Change the color based on completion status
                        : "gray",
                    }}
                  />
                </Box>
              </div>
              <hr style={{ width: "120%" }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CurrentOrder;
