import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"

function RequestsList ({groupeId}) {
    const urlGet = `${process.env.REACT_APP_YOUR_API_URL}/api/groups`;
    const urlPost = `${process.env.REACT_APP_YOUR_API_URL}/api/group_requests`;
    const [requests, setRequests] = useState(null);

    async function acceptRequest(request) {
        try {
            let reponse = await axios.post(
                `${urlPost}/${request.id}/accept`,
                {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setRequests(requests.filter((request) => request.id !== request.id))
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {(async () => {
        try {
            let response = await axios.get(`${urlGet}/${groupeId}/requests`);
            let requestsTmp = response.data["hydra:member"];

            requestsTmp = requestsTmp.map((request) => request.this.status === 0)
            console.log("requestsTmp", requestsTmp);
            setRequests(requestsTmp);
        } catch (error) {
            console.error(error);
        }
    })()
    }, [])

    if (!requests) {
        return (
            <div>
                <p>Chargement</p>
            </div>
        )
    }

    if (requests.length === 0) {
        return (
            <div>
                <p>Pas de demandes</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Liste des demandes</h1>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>
                        <p>{request.targetUser}</p>
                        <button onClick={() => acceptRequest(request)}>Accepter</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RequestsList