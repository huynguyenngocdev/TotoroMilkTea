import Admin from "./Components/Admin/Admin";
import Home from './App/Homepage'
import NotFound from "Components/NotFound/index";
const routes = [
  {
    path: "/",
    exact: true,
    main : ()=> <Home/>
  },
  {
      path: '/admin',
      exact: true,
      main : ()=> <Admin/>
  },
  {
    path: '',
    exact: false,
    main : ()=> <NotFound/>
}
];

export default routes