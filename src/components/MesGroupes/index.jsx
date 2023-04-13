import GroupesList from "../GroupesList";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function Groupes() {
  return (
    <Container>
      <Card
        sx={{
          maxWidth: "100%",
          padding: 3,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Mes Groupes</h1>
          <Button variant="contained" component={Link} to="/createGroupe">
            Créer un groupe
          </Button>
        </Container>
        <h2>Owner</h2>
        <GroupesList access="owner" />
        <h2>Member</h2>
        <GroupesList access="member" />
      </Card>
    </Container>
  );
}

export default Groupes;
