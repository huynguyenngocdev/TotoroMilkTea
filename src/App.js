import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {routes} from "./routes";

class App extends React.Component {
  showContent = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return result;
  };
  render() {
    return (
      <Router>
        <div>
          <Switch>{this.showContent(routes)}</Switch>
        </div>
      </Router>
    );
  }
}

export default App;
