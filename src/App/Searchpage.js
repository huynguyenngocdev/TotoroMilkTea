import Header from "../Components/Header/Header";

import ScrollOnTop from "../Components/ScrollIndicator/ScrollOnTop";

import Register from "../Components/Authentication/Register";
import Login from "../Components/Authentication/Login";
import AccManagement from "../Components/Header/UserManage/AccManagement";
import ChangePassword from "../Components/Header/UserManage/changePassword";
import ForgotPassword from "../Components/Authentication/ForgotPassword";

import SearchContent from "../Components/Content/SearchContent";

const Searchpage = (props) => {
  return (
    <div>
      <Header />
      <ScrollOnTop />
      <Register />
      <Login />

      <AccManagement />
      <ChangePassword />
      <ForgotPassword />

      <SearchContent />
    </div>
  );
};

export default Searchpage;
