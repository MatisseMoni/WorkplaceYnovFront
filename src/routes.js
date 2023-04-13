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
import Loader from './components/Loader';


const Layout = () => {
    const loading = useSelector(state => state.loading.isLoading);

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
                    element: <Home />,
                },
                {
                    path: "/userList",
                    element: <UserList />,
                },
                {
                    path: "/userList/:idUser",
                    element: <User />,
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
                    path: "*",
                    element: <div>404</div>,
                }
            ]
        }
    ]

export default routes;