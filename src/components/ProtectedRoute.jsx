import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    return (
        props.isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-up" replace/>
    )
}

export default ProtectedRoute;