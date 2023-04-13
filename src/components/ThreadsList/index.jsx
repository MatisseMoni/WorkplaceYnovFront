import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ThreadsList({ groupeId }) {
  const [threads, setThreads] = useState([]);
  const url = `${process.env.REACT_APP_YOUR_API_URL}/api/search`;

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      const threadsTmp = response.data["hydra:member"].filter((thread) => {
        return thread.relatedGroup === `/api/groups/${groupeId}`;
      });
      setThreads(threadsTmp);
    })();
  }, [groupeId]);

  return (
    <>
      <h3>Threads</h3>
      <Link to={`/groupes/${groupeId}/createThread`}>Ajouter un Thread</Link>
      <ul>
        {threads.map((thread) => {
          const id = thread["@id"].split("/")[3];

          return (
            <li>
              <h3>{thread.title}</h3>
              <p>{thread.slug}</p>
              <Link to={`/groupes/${groupeId}/threads/${id}`}>
                Voir le thread
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ThreadsList;
