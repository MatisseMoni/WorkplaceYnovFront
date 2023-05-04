import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MenuHeader from './components/MenuHeader';
import { useDispatch, useSelector } from 'react-redux';
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
import { setUsersLogged } from './store/reducers/auth';
import socketIOClient from 'socket.io-client';



const Layout = () => {
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