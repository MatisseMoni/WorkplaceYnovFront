import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import { useSelector } from "react-redux";

function Tchat({ thread }) {
    const id = thread['@id'].split('/')[3];
  const url = `${process.env.REACT_APP_YOUR_API_URL}/api/threads/${id}/messages`;
  const urlSend = `${process.env.REACT_APP_YOUR_API_URL}/api/messages`;
  const currentUser = useSelector((state) => state.auth.user);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            urlSend,
          {
            content: message,
            thread: thread["@id"],
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages([...messages, response.data]);
        setMessage("");
      } catch (error) {
        console.error(error);
      }
    })();
  }

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data["hydra:member"]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [url]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Messages</h1>
      {messages.length === 0 && !loading ? (
        <div>Il n'y a pas de messages</div>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <p>{message.content}</p>
              {`/api/users/${currentUser.id}` === message.owner ? 
              (<h2>Me</h2>) : (<h2>{message.owner}</h2>)}
            </li>
          ))}
        </ul>
      )}
      <form>
        <input
          type="text"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Tchat;
