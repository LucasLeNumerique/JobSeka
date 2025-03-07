import { Link, NavLink } from "react-router";
import { useAuth } from "./hooks/useAuth";


const Header = () => {
    const { token, user, logout } = useAuth()

    return (
        <header>
            <nav className="h-fit lg:h-15 py-2 gap-y-2 md:py-0 px-2 md:px-5 flex flex-col items-center lg:grid grid-cols-12 md:justify-between md:items-center">
                <NavLink to="/" className="block py-3 lg:py-0 col-span-2 text-2xl font-bold text-blue-500">
                    Job<span className="text-cyan-400">Seka</span> 
                </NavLink>
                <div className="col-start-5 col-end-9 font-medium">
                    {user?.role === "Candidate" && 
                        <Link 
                            to="/publier"
                            className="block mx-auto w-[200px] lg:w-fit py-2 px-4 text-center text-cyan-400 bg-linear-to-r from-white to-cyan-50 border border-cyan-400 rounded-xl"
                        >
                            Chercher des offres
                    </Link>
                    } 
                    {user?.role === "Recruiter" && 
                        <Link 
                            to="/publier"
                            className="block mx-auto w-[200px] lg:w-fit py-2 px-4 text-center text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 rounded-xl"
                        >
                            Publier une offre
                        </Link>
                    } 
                </div>
                <div className="col-start-9 col-end-13 flex flex-col lg:flex-row justify-end gap-y-2 gap-x-4 font-medium">
                    {token ? (
                        <>
                            <Link 
                                to="/" 
                                className="w-[200px] lg:w-fit py-2 px-4 text-center text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 rounded-xl">
                                Mon compte
                            </Link>
                            <button 
                                onClick={logout}
                                className="w-[200px] lg:w-fit cursor-pointer py-2 px-4 text-center text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 rounded-xl"
                            >
                                Se déconnecter
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/connexion" 
                                className="py-2 px-4 text-center text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 rounded-xl">
                                Se connecter
                            </Link>
                            <div className="group relative w-[200px] text-center bg-linear-to-r from-white to-blue-50 text-gray-900 rounded-xl">
                                <div className="cursor-pointer grid grid-cols-12 items-center text-blue-400 border border-blue-400 ml-auto p-2 rounded-xl group-hover:rounded-b-none group-hover:border-b-0">
                                    <p className="col-span-10">Créer mon compte</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="col-span-2 mx-auto size-5">
                                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="overflow-hidden hidden group-hover:flex flex-col z-10 absolute top-full left-0 right-0 flex flex-col rounded-b-xl">
                                    <Link to="/creation-de-compte?role=candidat" className="p-2 hover:text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 border-y-0">Je suis candidat</Link>
                                    <Link to="/creation-de-compte?role=recruteur" className="p-2 hover:text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 border-t-0 border-b-blue-400 rounded-b-xl">Je suis recruteur</Link>
                                </div>
                            </div>    
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header