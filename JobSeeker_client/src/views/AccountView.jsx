import { useAuth } from "../components/Auth/useAuth"

const AccountView = () => {
    const { user, logout } = useAuth()

    const roles = {
        Candidate: "chercheur d'emploi",
        Recruiter: "recruteur",
        Admin: "admin",
    }

    const userRoleText = roles[user.role] || ""

    return (
        <div className="flex flex-col gap-y-5">
            <h1>Mon compte</h1>
            <p className="text-2xl">Adresse email : <br/> {user.email}</p>
            <p className="text-2xl">Rôle : {userRoleText}</p>
            {user.role === "Recruiter" && user.companyName && (
                <p className="text-2xl">Société : {user.companyName}</p>
            )}
            <button 
                onClick={logout}
                className="cursor-pointer block w-full max-w-[350px] sm:max-w-none sm:w-fit mx-auto sm:ml-0 sm:mr-none py-3 px-8 font-bold transition text-red-400 hover:text-red-600 border border-red-300 hover:border-red-600 rounded-lg"
            >
                Se déconnecter
            </button>
        </div>
    )
}

export default AccountView