import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./components/ChangePassword";
import DashboardAdmin from "./components/dashboardAdmin";
import DashboardUser from "./components/DashboardUser";
import YourOrder from "./components/YourOrder";
import OrderTrackingPage from "./components/OrderTrackUser";
import AddStock from "./components/addStock";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
  {
    path: "/adminDashboard/:id/",
    element: <DashboardAdmin id=":id" />,
  },
  {
    path: "/userDashboard/:id/",
    element: <DashboardUser id=":id" />,
  },
  {
    path: "/userDashboard/:id/yourOrder",
    element: <YourOrder />,
  },
  {
    path: "/orderTrack/:orderId",
    element: <OrderTrackingPage />,
  },
  {
    path: "/addStock",
    element: <AddStock />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
