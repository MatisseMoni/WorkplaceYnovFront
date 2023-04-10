import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function GroupCard (props) {
    const { groupe } = props
    const { name, description } = groupe
    const id = groupe['@id'].split("/")[3]
    console.log("id", groupe['@id'].split("/")[3]);

    return (
        <div>
            <h3>{name}</h3>
            <p>{description}</p>
            <Link to={`/groupes/${id}`}>Voir le groupe</Link>
        </div>
    )
}

export default GroupCard