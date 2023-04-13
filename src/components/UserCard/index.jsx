import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

function UserCard({ user, redirect = false }) {
  return (
    <Container>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography component="div">
            <h2>Utilisateur:</h2>
            {user.nickname}
          </Typography>
          {user.email ? (
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <h2>Email:</h2>
              {user.email}
            </Typography>
          ) : null}
          {user.hasOwnProperty("ownedConversations") &&
          user.hasOwnProperty("tenantConversations") ? (
            <Typography variant="body2">
              {user.ownedConversations.length + user.tenantConversations.length}
            </Typography>
          ) : null}
        </CardContent>
        <>
          {redirect ? (
            <CardActions>
              <Link size="small" to={`/userList/${user.id}`}>
                <Button>Learn More</Button>
              </Link>
            </CardActions>
          ) : null}
        </>
      </Card>
    </Container>
  );
}

export default UserCard;
