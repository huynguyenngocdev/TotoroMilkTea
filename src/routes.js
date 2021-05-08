import Admin from "./App/Adminpage";
import Home from "./App/Homepage";
import NotFound from "Components/NotFound/index";
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/admin",
    exact: true,
    main: () => <Admin />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

const amdinRoutes = [
  {
    path: '/admin/:funtionId'
  }
]
export default routes;
