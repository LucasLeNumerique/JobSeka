import { Link, NavLink } from "react-router";
import { useAuth } from "./Auth/useAuth";
import { useEffect, useRef, useState } from "react";


const Header = () => {
    const { token, user, logout } = useAuth()
    const [open, setOpen] = useState(false)
    const menuRef = useRef()

    const handleNavClick = () => setOpen(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open])

    return (
        <div ref={menuRef}>
            <header className="relative py-2 md:py-0 px-2 md:px-5">
                <div className="block lg:hidden flex py-3 lg:py-0 justify-center">
                    <NavLink to="/" onClick={handleNavClick} className="block text-2xl font-bold text-blue-500">
                        Job<span className="text-cyan-400">Seka</span> 
                    </NavLink>
                    {user?.role === "Admin" &&
                        <NavLink to="/admin" onClick={handleNavClick} className="flex gap-1">
                            <p>Admin</p>  
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                            </svg>
                        </NavLink>
                    }
                </div>
                <button 
                    onClick={() => setOpen(prev => !prev)}
                    className="absolute top-6 right-6 md:top-4 block lg:hidden flex justify-center items-center"
                >
                    {open? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>              
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>

                <nav className={`${open ? "block" : "hidden"} lg:block h-fit lg:h-15 flex flex-col items-center lg:grid grid-cols-14 gap-2`}>
                    <div className="hidden lg:flex py-3 lg:py-0 col-span-2 items-center gap-2">
                        <NavLink to="/" onClick={handleNavClick} className="text-2xl font-bold text-blue-500">
                            Job<span className="text-cyan-400">Seka</span> 
                        </NavLink>
                        {user?.role === "Admin" &&
                            <NavLink to="/admin" onClick={handleNavClick} className="flex gap-1">
                                Admin
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                                </svg>
                            </NavLink>
                        }
                    </div>
                    <div className="col-start-6 col-end-10 font-medium">
                        {user?.role === "Candidate" && 
                            <Link 
                                to="/publier"
                                onClick={handleNavClick}
                                className="block mx-auto w-[200px] lg:w-fit py-2 px-4 text-center text-cyan-400 bg-linear-to-r from-white to-cyan-50 border border-cyan-400 rounded-xl"
                            >
                                Chercher des offres
                        </Link>
                        } 
                        {user?.role === "Recruiter" && 
                            <Link 
                                to="/publier-une-offre"
                                onClick={handleNavClick}
                                className="block mx-auto w-[200px] lg:w-fit py-2 px-4 text-center text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 rounded-xl"
                            >
                                Publier une offre
                            </Link>
                        } 
                    </div>
                    <div className="col-start-10 col-end-15 flex flex-col lg:flex-row justify-end gap-y-2 gap-x-4 font-medium">
                        {token ? (
                            <>
                                <Link 
                                    to="/mon-compte" 
                                    onClick={handleNavClick}
                                    className="w-[200px] lg:w-fit py-2 px-4 text-center text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 rounded-xl">
                                    Mon compte
                                </Link>
                                <button 
                                    onClick={() => { logout(); handleNavClick(); }}
                                    className="w-[200px] lg:w-fit cursor-pointer py-2 px-4 text-center text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 rounded-xl"
                                >
                                    Se déconnecter
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/connexion" 
                                    onClick={handleNavClick}
                                    className="py-2 px-4 text-center text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 rounded-xl">
                                    Se connecter
                                </Link>
                                <div className="group relative w-[200px] text-center bg-linear-to-r from-white to-blue-50 text-gray-900 rounded-xl ">
                                    <div className="cursor-pointer grid grid-cols-12 items-center text-blue-400 border border-blue-400 ml-auto p-2 rounded-xl group-hover:rounded-b-none group-hover:border-b-0">
                                        <p onClick={handleNavClick} className="col-span-10">Créer mon compte</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="col-span-2 mx-auto size-5">
                                            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="overflow-hidden hidden group-hover:flex flex-col z-10 absolute top-full left-0 right-0 flex flex-col rounded-b-xl">
                                        <Link to="/creation-de-compte?role=candidat" onClick={handleNavClick} className="p-2 hover:text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 border-y-0">Je suis candidat</Link>
                                        <Link to="/creation-de-compte?role=recruteur" onClick={handleNavClick} className="p-2 hover:text-blue-400 bg-linear-to-r from-white to-blue-50 border border-x-blue-400 border-t-0 border-b-blue-400 rounded-b-xl">Je suis recruteur</Link>
                                    </div>
                                </div>    
                            </>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header