import { Navigate } from "react-router"
import { useAuth } from "./Auth/useAuth"

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()

    if (!user) {
        sessionStorage.setItem("redirectMessage", "L'accès à la page précédente vous a été refusé car vous avez été déconnecté ou que vous n'avez pas les privilèges.")
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute