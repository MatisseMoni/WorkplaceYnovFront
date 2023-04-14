import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const PrivateRoute = (Component) => {
    const loggedUser = useSelector((state) => state.auth.user);
    const isLoading = useSelector((state) => state.loading.value);
    if (isLoading) {
        return <Loader />
    }
    return (
        loggedUser ? Component : <Navigate to="/" /> 
    )
}

export default PrivateRoute;