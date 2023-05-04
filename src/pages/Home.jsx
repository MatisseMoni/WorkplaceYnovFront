import { Container, Typography } from "@mui/material";
import GroupesList from "../components/GroupesList";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";

const ENDPOINT = "http://127.0.0.1:4001";

function Home() {
  const [response, setResponse] = useState("");
  const [usersLog, setUsersLog] = useState([]);
  const usersLogged = useSelector((state) => state.auth.usersLogged);

  useEffect(() => {
    setUsersLog(usersLogged);
    console.log(usersLog);
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, [usersLogged]);

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 3 }}>
        Liste des groupes
      </Typography>
      <GroupesList />
      <ul>
        {usersLog.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
    </Container>
  );
}

export default Home;
