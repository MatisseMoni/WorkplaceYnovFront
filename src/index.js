import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import { setLoading } from "./store/reducers/loading";
import axios from "axios";
import { login } from "./store/reducers/auth";

async function retrieveLoggedUsers() {
  const url = `${process.env.REACT_APP_YOUR_API_URL}/api/users/${process.env.REACT_APP_YOUR_API_ID_INFO}/info`;
  const urlGroupes = `${process.env.REACT_APP_YOUR_API_URL}/api/users/`;

  try {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
    if (token) {
      const response = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } });
      const data = response.data;

      const reponseGroupes = await axios.get(`${urlGroupes}${data.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      data.ownedGroups = reponseGroupes.data.ownedGroups;
      data.subscribedGroups = reponseGroupes.data.subscribedGroups;

      store.dispatch(login(data));
    }
  } catch (error) {
    localStorage.removeItem("token");
    console.error(error);
  }
}

Promise.all([retrieveLoggedUsers()]).finally(() => {
  store.dispatch(setLoading(false));

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

reportWebVitals();
