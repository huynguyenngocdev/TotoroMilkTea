import Admin from "./App/Adminpage";
import Home from "./App/Homepage";
import NotFound from "Components/NotFound/index";
import Search from "./App/Searchpage";

import AdsManagement from "./Components/Admin/AdsManagement";
import OrderManagement from "Components/Admin/OrderManagement";
import ProductManagement from "Components/Admin/ProductManagement";
import UserManagement from "Components/Admin/UserManagement/UserManagement";
import UpdateUser from "Components/Admin/UserManagement/UpdateUser";

import Cart from 'Components/Content/Products/Cart'
import Bill from 'Components/Content/Products/Bill'
import CheckOut from 'Components/Content/Products/checkOut'

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
    path: "/search",
    exact: true,
    main: () => <Search />,
  },
  {
    path: "/cart",
    exact: true,
    main: () => <Cart />,
  },
  {
    path: "/bill",
    exact: true,
    main: () => <Bill />,
  },
  {
    path: "/check-out",
    exact: true,
    main: () => <CheckOut />,
  },
  {
    path: "/admin",
    exact: false,
    main: ({ match }) => <Admin match={match} />,
  },
  {
    path: "*",
    exact: false,
    main: () => <NotFound />,
  },
];

const amdinRoutes = [
  {
    path: "/admin/",
    exact: true,
    main: () => <AdsManagement />,
  },
  {
    path: "/admin/ads",
    exact: true,
    main: () => <AdsManagement />,
  },
  {
    path: "/admin/orders",
    exact: true,
    main: () => <OrderManagement />,
  },
  {
    path: "/admin/products",
    exact: true,
    main: () => <ProductManagement />,
  },
  {
    path: "/admin/users",
    exact: true,
    main: () => <UserManagement />,
  },
  {
    path: "/admin/user/:id/edit",
    exact: true,
    main: ({ match }) => <UpdateUser match={match} />,
  },
];

export { routes, amdinRoutes };
