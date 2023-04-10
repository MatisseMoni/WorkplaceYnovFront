import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserList from "./pages/UserList";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import MenuHeader from "./components/MenuHeader";
import User from "./pages/User";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Compte from "./pages/Compte";
import Groupes from "./pages/Groupes";
import { Provider } from "react-redux";
import store from "./store/store";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from './store/reducers/auth';
import { useEffect } from "react";



const Layout = () => {
  const dispatch = useDispatch();
  const url = `${process.env.REACT_APP_YOUR_API_URL}/api/users/1/info`;

  useEffect(() => {
  
    (async () => {
        try {
          const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
          if (token) {
            const response = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } });
            const data = response.data;
            dispatch(login(data));
          }
        } catch (error) {
            console.log(error);
        }
    }
    )();
  }, [url]);

  return (
    <>
      <MenuHeader />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/userList",
        element: <UserList />,
      },
      {
        path: "/userList/:idUser",
        element: <User />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/compte",
        element: <Compte />,
      },
      {
        path: "/groupes",
        element: <Groupes />,
      }
    ],
  },
]);

/* const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions)); */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
