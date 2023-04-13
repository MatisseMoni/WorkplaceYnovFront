import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setGroupes as setGroupesAll,
  setGroupesMember,
  setGroupesOwned,
} from "../../store/reducers/groupe";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorsPage from "../ErrorsPage";
import GroupCard from "../GroupCard";
import Grid from "@mui/material/Grid";

function GroupesList({ access = "all" }) {
  const [groupes, setGroupes] = useState([]);
  const groupesInternal = useSelector((state) => state.groupes);
  const groupesMemberInternal = useSelector((state) => state.groupesMember);
  const groupesOwnedInternal = useSelector((state) => state.groupesOwned);
  const url = `${process.env.REACT_APP_YOUR_API_URL}/api/groups`;
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const retrieveGroupes = async () => {
    try {
      let response = await axios.get(url);
      let groupesTmp = response.data["hydra:member"];
      if (access === "owner" || access === "member") {
        if (currentUser === null) {
          throw new Error("Vous devez être connecté pour accéder à cette page");
        }
        if (access === "owner") {
          groupesTmp = groupesTmp.filter((groupe) =>
            currentUser.ownedGroups.includes(groupe["@id"])
          );
          groupesTmp.forEach((groupe) => {
            groupe.isOwner = true;
          });
          dispatch(setGroupesOwned(groupesTmp));
        } else if (access === "member") {
          groupesTmp = groupesTmp.filter((groupe) =>
            currentUser.subscribedGroups.includes(groupe["@id"])
          );
          groupesTmp.forEach((groupe) => {
            groupe.isMember = true;
          });
          dispatch(setGroupesMember(groupesTmp));
        }
      } else {
        if (currentUser) {
          groupesTmp.forEach((groupe) => {
            groupe.isMember = currentUser.subscribedGroups.includes(
              groupe["@id"]
            );
            groupe.isOwner = currentUser.ownedGroups.includes(groupe["@id"]);
          });
        }

        dispatch(setGroupesAll(groupesTmp));
      }
      setGroupes(groupesTmp);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    retrieveGroupes();
  }, [url, currentUser]);

  if (!groupes) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    // <div>
    //   {groupes.map((groupe, index) => (<Grid item xs={2} sm={4} md={4} key={index}>
    //<GroupCard key={index} groupe={groupe} displayLink={true} />))}
    // </div>

    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {groupes.map((groupe, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <GroupCard
            key={index}
            groupe={groupe}
            isGrid={true}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default GroupesList;
