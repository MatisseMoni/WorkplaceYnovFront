import { Container, Typography } from "@mui/material";
import GroupesList from "../components/GroupesList";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";

function Home() {
  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 3 }}>
        Liste des groupes
      </Typography>
      <GroupesList />
    </Container>
  );
}

export default Home;
