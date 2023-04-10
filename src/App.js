import logo from "./logo.svg";
import "./App.css";
import { Container } from "@mui/material";
import GroupesList from "./components/GroupesList";

function App() {
  return (
    <Container>
      <GroupesList />
    </Container>
  );
}

export default App;
