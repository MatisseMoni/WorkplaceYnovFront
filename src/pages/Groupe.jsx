import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import GroupCard from "../components/GroupCard";
import ThreadsList from "../components/ThreadsList";
import RequestsList from "../components/RequestsList";
import { useSelector } from "react-redux";
import MembersList from "../components/MembersList";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGroupes as setAllGroupes } from "../store/reducers/groupe";

function Groupe() {
  let { idGroupe } = useParams();
  const [groupe, setGroupe] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const url = `${process.env.REACT_APP_YOUR_API_URL}/api/groups/${idGroupe}`;
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleDelete() {
    if (!deleteConfirmation) {
      setDeleteConfirmation(true);
      return;
    }
    (async () => {
      try {
		const token = localStorage.getItem("token");
        const response = await axios.delete(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(response);
        dispatch(setAllGroupes(null));
        navigate("/compte");
      } catch (error) {
        console.error(error);
      }
    })();
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(url);
        setGroupe(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [idGroupe, currentUser]);

  if (!groupe) {
    return (
      <Box
        sx={{
          display: "block",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <GroupCard groupe={groupe} />
      {`/api/users/${currentUser.id}` === groupe.owner ? (
        <RequestsList groupeId={idGroupe} />
      ) : null}
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}>
        <ThreadsList groupeId={idGroupe} />
        <MembersList groupId={idGroupe} owner={groupe.owner} />
      </Box>
      {`/api/users/${currentUser.id}` === groupe.owner ? (
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            variant="outlined"
            color="error"
            sx={{
              mt: 2,
              mb: 2,
              textAlign: "center",
            }}
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete()}
          >
            {deleteConfirmation ? "Es-tu sur ?" : "Supprimer le groupe"}
          </Button>
          {deleteConfirmation ? (
            <Button
              variant="text"
              sx={{
                mt: 2,
                mb: 2,
                textAlign: "center",
                ml: 2,
              }}
              onClick={() => setDeleteConfirmation(false)}
            >
              annuler
            </Button>
          ) : null}
        </Box>
      ) : null}
    </Container>
  );
}

export default Groupe;
