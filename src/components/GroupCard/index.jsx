import React, { useEffect } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

function GroupCard (props) {
    const { groupe } = props
    const { name, description } = groupe
    
    return (
        <div>
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    )
}

export default GroupCard