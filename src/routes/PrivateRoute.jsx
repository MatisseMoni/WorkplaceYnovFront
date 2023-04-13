import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (Component) => {
    const loggedUser = useSelector((state) => state.auth.user);

    return (
        loggedUser ? Component : <Navigate to="/" /> 
    )
}

export default PrivateRoute;