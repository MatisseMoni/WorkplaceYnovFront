import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const GuestRoute = (Component) => {
    const loggedUser = useSelector((state) => state.auth.user);
    const isLoading = useSelector((state) => state.loading.value);
    if (isLoading) {
        return <Loader />
    }
    return (
        loggedUser ? <Navigate to="/" /> : Component
    )
}

export default GuestRoute;