import { Link, NavLink } from "react-router";

const Header = () => {
    return (
        <header>
            <nav className="h-fit md:h-15 py-2 gap-y-2 md:py-0 px-2 md:px-5 flex flex-col items-center md:flex-row md:justify-between md:items-center">
                <NavLink to="/" className="text-2xl font-bold text-blue-400">
                    Job<span className="text-cyan-400">Seka</span> 
                </NavLink>
                <div>
                    {/* <NavLink to="/rechercher-jobs">Mes offres sauvegardées</NavLink> */}
                </div>
                <div className="group relative w-[175px] text-center font-medium bg-linear-to-r from-white to-blue-50 text-gray-900 rounded-xl">
                    <div className="cursor-pointer grid grid-cols-12 items-center text-blue-400 border border-blue-400 ml-auto p-2 rounded-xl group-hover:rounded-b-none group-hover:border-b-0">
                        <p className="col-span-10">Se connecter</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="col-span-2 mx-auto size-5">
                            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="overflow-hidden hidden group-hover:flex flex-col z-10 absolute top-full left-0 right-0 flex flex-col rounded-b-xl">
                        <Link to="/connexion?role=candidat" className="p-2 hover:text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 border-y-0">Je suis candidat</Link>
                        <Link to="/connexion?role=recruteur" className="p-2 hover:text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 border-t-0 border-b-blue-400 rounded-b-xl">Je suis recruteur</Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header