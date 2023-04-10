import { CardActions, CardContent } from '@mui/material';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Typography, Button } from '@mui/material';

function GroupCard ({ groupe, displayLink = false }) {
    const { name, description } = groupe
    const id = groupe['@id'].split("/")[3]
    console.log("id", groupe['@id'].split("/")[3]);

    return (
        // <div>
        //     <h3>{name}</h3>
        //     <p>{description}</p>
        //     {displayLink ? (<Link to={`/groupes/${id}`}>Voir le groupe</Link>) : null }
        // </div>
        <>
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
                <CardActions>
                    <Button>
                    {displayLink ? (<Link to={`/groupes/${id}`}>Voir le groupe</Link>) : null }
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
        </>
    )
}

export default GroupCard