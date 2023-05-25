import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import MenuHeader from './components/MenuHeader';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { login } from './store/reducers/auth';
import GuestRoute from './routes/GuestRoute';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';
import UserList from './pages/UserList';
import User from './pages/User';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import Compte from './pages/Compte';
import Groupe from './pages/Groupe';
import CreateGroupe from './pages/CreateGroupe';
import CreateThread from './pages/CreateThread';
import Error404 from './pages/Error404';
import Thread from './pages/Thread';
import { newMessage } from './store/reducers/message';
import { newThread } from './store/reducers/thread';
import { setUsersLogged } from './store/reducers/auth';
import { newGroupe, deleteGroupe } from './store/reducers/groupe';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);
const Layout = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    useEffect(() => {
        socket.on("new group", (data) => {
            dispatch(newGroupe({ groupe: data, user: currentUser }));
        });

        socket.on('new thread', (data) => {
            dispatch(newThread({ group: data.group, thread: data.thread }));
        });

        socket.on('new message', (data) => {
            dispatch(newMessage({ thread: data.thread, message: data.message }));
        });

        socket.on("new login", (data) => {
            dispatch(setUsersLogged(data));
        });

        socket.on("delete group", (data) => {
            console.log('router', data);
            dispatch(deleteGroupe(data));
        });

        return () => {
            socket.off('new message');
            socket.off('new login');
            socket.off('new group');
            socket.off('new thread');
            socket.off('delete group');
        };
    }, [socket, dispatch]);

    return (
        <>
            <MenuHeader />
            <Outlet />
        </>
    );
};

const routes = () =>
    [
        {
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: (PrivateRoute(<Home />)),
                },
                {
                    path: "/userList",
                    element: (<UserList />),
                },
                {
                    path: "/userList/:idUser",
                    element: (PrivateRoute(<User />)),
                },
                {
                    path: "/inscription",
                    element: (GuestRoute(<Inscription />)),
                },
                {
                    path: "/connexion",
                    element: (GuestRoute(<Connexion />)),
                },
                {
                    path: "/compte",
                    element: (PrivateRoute(<Compte />)),
                },
                {
                    path: "/groupes/:idGroupe",
                    element: (PrivateRoute(<Groupe />)),
                },
                {
                    path: "/createGroupe",
                    element: (PrivateRoute(<CreateGroupe />)),
                },
                {
                    path: "/groupes/:idGroupe/createThread",
                    element: (PrivateRoute(<CreateThread />)),
                },
                {
                    path: "/groupes/:idGroupe/threads/:idThread",
                    element: (PrivateRoute(<Thread />)),
                },
                {
                    path: "*",
                    element: <Error404 />,
                }
            ]
        }
    ]

export default routes;