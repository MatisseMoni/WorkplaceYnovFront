import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Tchat from "../components/Tchat";

function Thread() {
    let { idGroupe ,idThread } = useParams();
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/threads/`;
    const [thread, setThread] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${url}${idThread}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setThread(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [idGroupe, idThread]);

    if (!thread) {
        return <Loader />;
    }

    return (
        <div>
            <h1>{thread.title}</h1>
            <p>{thread.content}</p>
            <p>{thread.owner}</p>
            <Tchat thread={thread} />
        </div>
    );
    }

export default Thread;