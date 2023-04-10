import GroupesList from "../components/GroupesList"
import { Container } from "@mui/material"
import { Link } from "react-router-dom"

function Groupes () {

    return (
        <Container>
            <h1>Mes Groupes</h1>
            <Link to={"/createGroupe"}>Créer un groupe</Link>
            <h2>Owner</h2>
            <GroupesList access="owner" />
            <h2>Member</h2>
            <GroupesList access="member" />
        </Container>
    )
}

export default Groupes