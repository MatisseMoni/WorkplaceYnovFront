import { CardActions, CardContent } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Typography, Button } from "@mui/material";
import axios from "axios";

function GroupCard({
  groupe,
  isGrid = false,
}) {
  const { name, description, isMember = false, isOwner = false } = groupe;
  const id = groupe["@id"].split("/")[3];
  const displayLink = isMember || isOwner;
  const url = `${process.env.REACT_APP_YOUR_API_URL}/api/group_requests`;

  async function requestAccess() {
    try {
      let reponse = await axios.post(
        url,
        {
          targetGroup: groupe["@id"],
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">{description}</Typography>
          <CardActions>
            {isGrid ? (
              displayLink ? (
                <Button>
                  <Link to={`/groupes/${id}`}>Voir le groupe</Link>
                </Button>
              ) : (
                <Button onClick={requestAccess}>Demander l'accès</Button>
              )
            ) : null}
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}

export default GroupCard;
