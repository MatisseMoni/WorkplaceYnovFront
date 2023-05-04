import { Container, Typography } from "@mui/material";
import GroupesList from "../components/GroupesList";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";

function Home() {

  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <Container>
      <Typography variant="h3" sx={{textAlign: "center", marginBottom: 3}}>Liste des groupes</Typography>
      <GroupesList />
    </Container>
  );
}

export default Home;
