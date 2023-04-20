import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";

function UserCard({ user, redirect = false }) {
  return (
    <Container>
      <Card
        sx={{
          maxWidth: "100%",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar
              sx={{ backgroundColor: "#048b9a", width: 70, height: 70, mb: 2}}
              aria-label="recipe"
              alt={user.nickname}
              src="/static/images/avatar/2.jpg"

            ></Avatar>
            <Typography variant="h5" component="h1" fontWeight='700'>
              Mon Profil
            </Typography>
          </Box>
          <Typography component="h3" sx={{ mb: 1.5 }} color="text.secondary">
            Utilisateur:<br/>
            {user.nickname}
          </Typography>
          {user.email ? (
            <Typography component="h3" sx={{ mb: 1.5 }} color="text.secondary">
              Email:<br/>
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
