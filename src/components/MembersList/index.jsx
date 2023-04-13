import React, { useState, useEffect } from 'react'
import axios from 'axios'

function MembersList ({ groupId, owner }) {
    const [members, setMembers] = useState([])
    const [error, setError] = useState(null)
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/groups`;

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${url}/${groupId}/members`)
                const membersTmp = response.data["hydra:member"]
                membersTmp.forEach(member => {
                    console.log(member["@id"], owner)
                    member.isOwner = member["@id"] === owner
                })
                setMembers(membersTmp)
            }
            catch (error) {
                console.error(error)
                setError(error)
            }

        })()
    }, [])

  return (
    <>
    <h3>Membres</h3>
    <ul>
      {members.map(member => (
        <li key={member.id}>
            <h3>{member.nickname} {member.isOwner ? (<span>(admin)</span>) : null}</h3>
        </li>
      ))}
    </ul>
    </>
  )
}

export default MembersList