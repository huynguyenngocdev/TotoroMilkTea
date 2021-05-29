import Header from "../Components/Header/Header";

import ScrollOnTop from "../Components/ScrollIndicator/ScrollOnTop";

import Register from "../Components/Authentication/Register";
import Login from "../Components/Authentication/Login";
import Ads from "../Components/Advertisement/Ads";

import Content from '../Components/Content/Content'

import Footer from "../Components/Footer/Footer";

const Homepage = () => {
  return (
    <div>
      <Header />
      <ScrollOnTop />
      <Ads />
      <Register />
      <Login />
      <Content/>
      <Footer />
    </div>
  );
};

export default Homepage