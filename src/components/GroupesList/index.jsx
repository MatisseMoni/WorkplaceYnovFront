import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGroupes as setGroupesAll, setGroupesMember, setGroupesOwned } from '../../store/reducers/groupe';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorsPage from '../ErrorsPage';
import GroupCard from '../GroupCard';

function GroupesList ({access = "all"}) {
    const [groupes, setGroupes] = useState([]);
    const groupesInternal = useSelector(state => state.groupes)
    const groupesMemberInternal = useSelector(state => state.groupesMember)
    const groupesOwnedInternal = useSelector(state => state.groupesOwned)
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/groups`;
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);

    const retrieveGroupes = async () => {
        try {
            let response = await axios.get(url);
            let groupesTmp = response.data["hydra:member"];

            if (access === "owner") {
                console.log("owner");
                groupesTmp = groupesTmp.filter(groupe => groupe.owner === `/api/users/${currentUser.id}`);
                dispatch(setGroupesOwned(groupesTmp));
            }
            else if (access === "member") {
                console.log("member");
                groupesTmp = await Promise.all(groupesTmp.map(async (groupe) => {
                    let members = await retrieveMembers(groupe);
                    groupe.members = members.map(member => member["@id"]);
                    return groupe;
                }));
                groupesTmp = groupesTmp.filter(groupe => groupe.members.includes(`/api/users/${currentUser.id}`));
                console.log(groupesTmp);
                dispatch(setGroupesMember(groupesTmp));
            }
            else {
                console.log("all");
                console.log("all", groupesTmp);
                dispatch(setGroupesAll(groupesTmp));
            }
            
            console.log("groupesTmp", groupesTmp);
            setGroupes(groupesTmp)
        }
        catch (error) {
            setError(error);
        }
    }

    const retrieveMembers = async (groupe) => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_YOUR_API_URL}/api/groups/${groupe.id}/members`);
            return response.data["hydra:member"];
        }
        catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        if (groupesInternal || groupesMemberInternal || groupesOwnedInternal) {
            console.log("groupesInternal", groupesInternal);
            switch (access) {
                case "owner":
                    setGroupes(groupesOwnedInternal);
                    break;
                case "member":
                    setGroupes(groupesMemberInternal);
                    break;
                default:
                    setGroupes(groupesInternal);
                    break;
            }
        } else {
            console.log("retrieveGroupes");
            retrieveGroupes();
        }
    }, [url, currentUser]);



    if (!groupes) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
    <div>
      {groupes.map((groupe, index) => (<GroupCard key={index} groupe={groupe} displayLink={true} />))}
    </div>
  )
}

export default GroupesList;