import React from "react";
import AdminFunctions from "../Components/Admin/AdminFunctions";
import { Redirect } from "react-router-dom";
function Adminpage(props) {
  if (
    sessionStorage.getItem("admin") ===
    "0356ef04b426649da842b8120640953e3be097a551111355d2b6739e4e8042b2"
  ) {
    return (
      <div className="container-fluid">
        <AdminFunctions match={props.match} />
      </div>
    );
  } else {
    return <Redirect to="/error"></Redirect>;
  }
}

export default Adminpage;
