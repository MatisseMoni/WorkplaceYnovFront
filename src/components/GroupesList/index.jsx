import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGroupes as setGroupesAll } from "../../store/reducers/groupe";
import axios from "axios";
import GroupCard from "../GroupCard";
import Grid from "@mui/material/Grid";
import Loader from "../Loader";

function GroupesList({ access = "all" }) {
  const url = `/api/groups`;

  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  const groupesInternal = useSelector((state) => state.groupe.groupes);


  const retrieveGroupes = async () => {
    try {
      let groupesTmp = [];
      let nextUrl = url;

      while (nextUrl) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_YOUR_API_URL}${nextUrl}`);
          groupesTmp = [...groupesTmp, ...response.data["hydra:member"]];
          nextUrl = response.data["hydra:view"]["hydra:next"];
        } catch (error) {
          setError(error);
          break;
        }
      }

      dispatch(setGroupesAll({ groupes: groupesTmp, user: currentUser }));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (!currentUser && access != "all") throw new Error("Not logged in");

    (async () => {
      if (!groupesInternal || groupesInternal.length === 0) {
        retrieveGroupes();
      }
    })();
  }, [groupesInternal, currentUser]);
  
  if (!groupesInternal || groupesInternal.length === 0) {
    return <Loader />;
  }

  const groupesFiltered =
    access === "all"
      ? groupesInternal
      : access === "owner"
      ? groupesInternal.filter((g) => g.isOwner)
      : groupesInternal.filter((g) => g.isMember && !g.isOwner);

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {groupesFiltered.map((groupe, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <GroupCard key={index} groupe={groupe} isGrid={true} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default GroupesList;
