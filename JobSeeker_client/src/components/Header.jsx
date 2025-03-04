import { NavLink } from "react-router";

const Header = () => {
    return (
        <header>
            <nav className="h-fit md:h-15 py-2 gap-y-2 md:py-0 px-2 md:px-5 flex flex-col items-center md:flex-row md:justify-between md:items-center">
                <NavLink to="/" className="text-2xl font-bold text-blue-400">
                    Job<span className="text-cyan-400">Seka</span> 
                </NavLink>
                <div>
                    
                </div>
                <div>
                    <NavLink>
                        Se connecter
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}

export default Header