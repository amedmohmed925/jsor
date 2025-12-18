import { Routes, Route } from "react-router-dom";
import './index.css'
import Home from "./shared/pages/Home";
import Login from "./shared/pages/Login";
import Register from "./shared/pages/Register";
import Contact from "./shared/pages/Contact";
import ServiceProvider from "./shared/pages/ServiceProvider";
import Works from "./shared/pages/Works";
import Oreders from "./user/pages/Orders";
import Balance from "./user/pages/Balance";
import Profile from "./user/pages/Profile";
import ProviderAccount from "./user/pages/ProviderAccount";
import BasicUpload from "./user/pages/BasicUpload";
import TripUpload from "./user/pages/TripUpload";
import ContractUpload from "./user/pages/ContractUpload";
import Notifications from "./user/pages/Notifications";
import Tracking from "./user/pages/Tracking";
import DriverOrders from "./driver/pages/DriverOrders";
import DriverNotifications from "./driver/pages/DriverNotifications";
import DriverBalance from "./driver/pages/DriverBalance";
import DriverProfile from "./driver/pages/DriverProfile";
import MissionInroad from "./driver/pages/MissionInroad";
import MissionStarted from "./driver/pages/MissionStarted";
import MissionArrived from "./driver/pages/MissionArrived";
import OrderDetails from "./driver/pages/OrderDetails";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AddTruck from "./admin/pages/AddTruck";
import AddDriver from "./admin/pages/AddDriver";
function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/create-account" element={<Register />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/service-provider" element={<ServiceProvider />} />
    <Route path="/works" element={<Works />} />
    <Route path="/user/orders" element={<Oreders />} />
    <Route path="/user/balance" element={<Balance />} />
    <Route path="/user/profile" element={<Profile />} />
    <Route path="/user/provider-account" element={<ProviderAccount />} />
    <Route path="/user/basic-upload" element={<BasicUpload />} />
    <Route path="/user/trip-upload" element={<TripUpload />} />
    <Route path="/user/contract-upload" element={<ContractUpload />} />
    <Route path="/user/notifications" element={<Notifications />} />
    <Route path="/user/tracking" element={<Tracking />} />
    <Route path="/driver/orders" element={<DriverOrders />} />
    <Route path="/driver/balance" element={<DriverBalance />} />
    <Route path="/driver/profile" element={<DriverProfile />} />
    <Route path="/driver/notifications" element={<DriverNotifications />} />
    <Route path="/driver/mission-in-road" element={<MissionInroad />} />
    <Route path="/driver/mission-started" element={<MissionStarted />} />
    <Route path="/driver/mission-arrived" element={<MissionArrived />} />
    <Route path="/driver/order-details" element={<OrderDetails />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/add-truck" element={<AddTruck />} />
    <Route path="/admin/add-driver" element={<AddDriver />} />

  </Routes>
  );
}

export default App;
