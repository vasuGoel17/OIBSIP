import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KitchenIcon from "@mui/icons-material/Kitchen";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import socketIOClient from "socket.io-client";
import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import Avatar from "@mui/material/Avatar";

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const [status, setStatus] = useState({
    payment: false,
    inKitchen: false,
    sentToDelivery: false,
  });

  const getCurrentOrders = async () => {
    const res = await fetch(`/api/pizzas?orderId=${orderId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    if (data.status == 200) {
      console.log(data.order);
      if (data.order) {
        setOrders(data.order.pizzaName);
        setStatus({
          payment: data.order.payment,
          inKitchen: data.order.inKitchen,
          sentToDelivery: data.order.sentToDelivery,
        });
      } else {
        setOrderCompleted(true);
      }
      setLoading(false);
    } else {
      console.log("error");
    }
  };

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
      socket.on("orderUpdated", (updatedOrderId) => {
        console.log(`Order with orderId ${updatedOrderId} has been updated.`);
        getCurrentOrders();
        // Implement logic to update your UI accordingly
      });

      socket.on("orderDeleted", (deletedOrderId) => {
        console.log(`Order with orderId ${deletedOrderId} has been deleted.`);
        setOrderCompleted(true);
        // Implement logic to update your UI accordingly
      });
    }
  }, [socket]);

  return (
    <div>
      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}

      <h2>Order Tracking - {orderId}</h2>

      {orderCompleted ? (
        <div className="orderDelivered">
          <h1 className="hhh">
            <Avatar sx={{ bgcolor: "success.main" }}>
              <DoneIcon color="white" />
            </Avatar>
            Your Order has Delivered Successfully
          </h1>
          <h2>Thanks for ordering, have a nice meal</h2>
        </div>
      ) : (
        <div className="">
          <div className="table">
            <table>
              <tbody>
                {orders.map((pizza, index) => (
                  <tr key={index}>
                    <td>{pizza.name}</td>
                    <td className="secondTD">{pizza.size}</td>
                    <td className="secondlastTD">{pizza.quantity}</td>
                    {pizza.name === "customized Pizza" ? (
                      <td className="lastTD">{pizza.descriptionIfCustomize}</td>
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
                  backgroundColor: status.payment
                    ? "#38d238" // Change the color based on completion status
                    : "gray",
                }}
              />
              <div
                className="iconBox"
                style={{
                  borderColor: status.payment
                    ? "#38d238" // Change the color based on completion status
                    : "gray",
                }}
              >
                <IconButton
                  className="iconbtn"
                  disabled={true}
                  style={{
                    color: status.payment
                      ? "#38d238" // Change the color based on completion status
                      : "gray",
                    border: status.payment
                      ? "#38d238" // Change the color based on completion status
                      : "gray",
                  }}
                >
                  <ShoppingCartIcon
                    color={status.payment ? "success" : "action"}
                  />
                  <span>Order Placed</span>
                </IconButton>
              </div>

              <div
                className="iconForDelLine"
                style={{
                  borderRadius: "0px",
                  backgroundColor: status.inKitchen
                    ? "#38d238" // Change the color based on completion status
                    : "gray",
                }}
              />
              <div
                className="iconBox"
                style={{
                  borderColor: status.inKitchen
                    ? "#38d238" // Change the color based on completion status
                    : "gray",
                }}
              >
                <IconButton
                  className="iconbtn"
                  disabled={true}
                  style={{
                    color: status.inKitchen
                      ? "#38d238" // Change the color based on completion status
                      : "gray",
                    border: status.inKitchen
                      ? "#38d238" // Change the color based on completion status
                      : "gray",
                  }}
                >
                  <KitchenIcon
                    color={status.inKitchen ? "success" : "action"}
                  />
                  <span>In Kitchen</span>
                </IconButton>
              </div>

              <div
                className="iconForDelLine"
                style={{
                  borderRadius: "0",
                  backgroundColor: status.sentToDelivery
                    ? "#38d238" // Change the color based on completion status
                    : "gray",
                }}
              />
              <div
                className="iconBox"
                style={{
                  borderColor: status.sentToDelivery
                    ? "#38d238" // Change the color based on completion status
                    : "gray",
                }}
              >
                <IconButton
                  className="iconbtn"
                  disabled={true}
                  style={{
                    color: status.sentToDelivery
                      ? "#38d238" // Change the color based on completion status
                      : "gray",
                    border: status.sentToDelivery
                      ? "#38d238" // Change the color based on completion status
                      : "gray",
                  }}
                >
                  <DeliveryDiningIcon
                    color={status.sentToDelivery ? "success" : "action"}
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
                  backgroundColor: status.sentToDelivery
                    ? "#38d238" // Change the color based on completion status
                    : "gray",
                }}
              />
            </Box>
          </div>
        </div>
      )}

      {/* Add sections for kitchen status, delivery status, etc. */}
    </div>
  );
};

export default OrderTrackingPage;
