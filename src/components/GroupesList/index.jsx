import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setGroupes as setGroupesAll} from "../../store/reducers/groupe";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container } from "@mui/material";
import GroupCard from "../GroupCard";
import Grid from "@mui/material/Grid";
import Loader from "../Loader";
import Pagination from "../Pagination";

function GroupesList({ access = "all" }) {
  const [groupes, setGroupes] = useState([]);
  const groupesInternal = useSelector((state) => state.groupes);
  const url = `${process.env.REACT_APP_YOUR_API_URL}/api/groups`;
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const currentPage = useParams().page || 1;

  const retrieveGroupes = async () => {
    try {
      let response = await axios.get(`${url}?page=${currentPage}`);
      let groupesTmp = response.data["hydra:member"];
      setTotalItems(response.data["hydra:totalItems"]);
      if (currentUser) {
        groupesTmp.forEach((groupe) => {
          groupe.isMember = currentUser.subscribedGroups.includes(
            groupe["@id"]
          );
          groupe.isOwner = currentUser.ownedGroups.includes(groupe["@id"]);
        });
      }
      dispatch(setGroupesAll(groupesTmp));
      return groupesTmp;
    } catch (error) {
      setError(error);
    }
  };

  function getOwnedGroupes(groupes) {
    if (groupes.length > 0) {
      return groupes.filter((groupe) => groupe.isOwner);
    }
    return [];
  }

  function getMemberGroupes(groupes) {
    if (groupes.length > 0) {
      return groupes.filter((groupe) => groupe.isMember && !groupe.isOwner);
    }
    return [];
  }

  useEffect(() => {
    (async () => {
      if (!currentUser && access != "all") throw new Error("Not logged in");
      let g;
      if (!groupesInternal || currentPage != 1) {
        g = await retrieveGroupes();
      } else {
        g = await groupesInternal;
      }
      switch (access) {
        case "all":
          setGroupes(g);
          break;
        case "owner":
          setGroupes(getOwnedGroupes(g));
          break;
        case "member":
          setGroupes(getMemberGroupes(g));
          break;
        default:
          setGroupes(g);
      }
    })();
  }, [groupesInternal, currentPage, currentUser]);
  if (!groupes) {
    return <Loader />;
  }

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {groupes.map((groupe, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <GroupCard key={index} groupe={groupe} isGrid={true} />
          </Grid>
        ))}
      </Grid>
      {/* <Pagination totalPostes={totalItems} /> */}
    </>
  );
}

export default GroupesList;
