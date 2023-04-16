import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorsPage from "../components/ErrorsPage";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/auth";
import MesGroupes from "../components/MesGroupes";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card, Container } from "@mui/material";

function Compte() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const url = `${process.env.REACT_APP_YOUR_API_URL}/api/users/1/info`;

  const urlDelete = `${process.env.REACT_APP_YOUR_API_URL}/api/users/`;
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleDelete() {
    if (!deleteConfirmation) {
      setDeleteConfirmation(true);
      return;
    }
    try {
      let response = await axios.delete(`${urlDelete}${currentUser.id}`);
      dispatch(setUser(null));
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    setUser(currentUser);
  }, [url, currentUser]);

  if (error) {
    return <ErrorsPage />;
  }

  if (!user) {
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
    <>
      <UserCard user={user} />
        <MesGroupes />
        <Container>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>

      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => handleDelete()}
        sx={{ 
          mt: 2,
          mb: 2,
          textAlign: "center",
        }}
      >
        {deleteConfirmation ? "Es-tu sur ?" : "Supprimer mon compte"}
      </Button>
      {deleteConfirmation ? (
        <Button
          variant="text"
          sx={{
            mt: 2,
            mb: 2,
            textAlign: "center",
			ml : 2
          }}
          onClick={() => (setDeleteConfirmation(false))}
        >
			annuler
		</Button>
      ) : null}</Box>
      </Container>
    </>
  );
}

export default Compte;
