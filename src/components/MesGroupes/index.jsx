import GroupesList from "../GroupesList";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function Groupes () {

    return (
        <Container>
            <h1>Mes Groupes</h1>
            <Card sx={{ maxWidth: 345, padding:2  }} > 
            <MenuItem color="inherit" component={Link} to="/createGroupe">
                Créer un groupe
                </MenuItem>
            </Card>
            <h2>Owner</h2>
            <GroupesList access="owner" />
            <h2>Member</h2>
            <GroupesList access="member" />
        </Container>
    )
}

export default Groupes