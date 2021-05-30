import Header from "../Components/Header/Header";

import ScrollOnTop from "../Components/ScrollIndicator/ScrollOnTop";

import Register from "../Components/Authentication/Register";
import Login from "../Components/Authentication/Login";
import AccManagement from "../Components/Header/UserManage/AccManagement";
import ChangePassword from "../Components/Header/UserManage/changePassword";
import ForgotPassword from "../Components/Authentication/ForgotPassword";

import Ads from "../Components/Advertisement/Ads";

import Content from "../Components/Content/Content";

import Footer from "../Components/Footer/Footer";

const Homepage = () => {
  return (
    <div>
      <Header/>
      <ScrollOnTop />
      <Ads />
      <Register />
      <Login />

      <AccManagement />
      <ChangePassword />
      <ForgotPassword />

      <Content/>

      <Footer />
    </div>
  );
};

export default Homepage;
