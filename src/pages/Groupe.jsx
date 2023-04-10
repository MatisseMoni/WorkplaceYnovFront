import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import GroupCard from "../components/GroupCard";
import { Link } from "react-router-dom";
import ThreadsList from '../components/ThreadsList';


function Groupe () {
    let { idGroupe } = useParams();
    const [groupe, setGroupe] = useState();
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/groups/${idGroupe}`;

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(url);
                console.log("response", response);
                setGroupe(response.data);
            }
            catch (error) {
                console.error(error);
            }
        })();
    }, [idGroupe])

    if (!groupe) {
        return (
            <Box sx={{ display: 'block', position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
                <CircularProgress />
            </Box>);
    }

    return (
        <>
            <GroupCard groupe={groupe} />
            <Link to={`/groupes/${idGroupe}/createThread`}>Ajouter un Thread</Link>
            <h3>Threads</h3>
            <ThreadsList groupeId={idGroupe} />
        </>
    )
}

export default Groupe;