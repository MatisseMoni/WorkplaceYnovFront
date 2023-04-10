import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGroupes } from '../../store/reducers/groupe';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorsPage from '../ErrorsPage';
import GroupCard from '../GroupCard';


function GroupesList () {
    
    const [groupes, setGroupes] = useState([]);
    const groupesInternal = useSelector(state => state.groupes)
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/groups`;
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    

    const retrieveGroupes = async () => {
        try {
            let response = await axios.get(url);
            console.log(response.data["hydra:member"]);
            let groupesTmp = response.data["hydra:member"];
            dispatch(setGroupes(groupesTmp));
        }
        catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        if (groupesInternal) {
            setGroupes(groupesInternal);
        } else {
            retrieveGroupes();
        }
    }, [url, groupesInternal]);



    if (!groupes) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
    <div>
      {groupes.map(groupe => <GroupCard key={groupe.id} groupe={groupe} />)}
    </div>
  )
}

export default GroupesList;