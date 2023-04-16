import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Thread() {
    let { idGroupe ,idThread } = useParams();
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/threads/`;

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(token);
                const response = await axios.get(`${url}${idThread}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [idGroupe, idThread]);


/*     if (loading) return <div>Loading...</div>;
    if (error) return <div>Error!</div>; */
    
    return (
        <div>
            <h1>Thread</h1>
        </div>
    );
    }

export default Thread;