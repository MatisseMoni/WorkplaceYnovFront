import logo from "./logo.svg";
import "./App.css";
import { Container, Typography } from "@mui/material";
import GroupesList from "./components/GroupesList";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const routing = useRoutes(routes());
  return (
    <>
      {routing}
    </>
  );
}

export default App;
