import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = (Component) => {
    const loggedUser = useSelector((state) => state.auth.user);

    return (
        loggedUser ? <Navigate to="/" /> : Component
    )
}

export default GuestRoute;