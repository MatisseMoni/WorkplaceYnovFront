import { Container, Typography } from "@mui/material";
import GroupesList from "../components/GroupesList";

function Home() {
  return (
    <Container>
      <Typography variant="h3" sx={{textAlign: "center", marginBottom: 3}}>Liste des groupes</Typography>
      <GroupesList />
    </Container>
  );
}

export default Home;
