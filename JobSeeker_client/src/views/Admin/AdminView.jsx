import { useEffect } from "react";
import UserList from "../../components/UserList"
import { useAuth } from "../../components/Auth/useAuth";
import { useNavigate } from "react-router";

const AdminView = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "Admin") {
            navigate("/");
            return;
        }
    }, [])
    
    return (
        <>
            <h1 className="mb-5 text-center">Espace Admin</h1>
            <UserList />
        </>
    )
}

export default AdminView