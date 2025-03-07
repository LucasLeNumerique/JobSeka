import { Link } from "react-router"
import { formatSalary, formatDate } from "../utils/formatters"
import { useAuth } from "./hooks/useAuth"

const SelectedJob = ({ selectedJob }) => {
    const { user } = useAuth()
    if (!selectedJob) {
        return (
            <div>
                <h2>Détails de l'offre</h2>
                <p>Sélectionnez une offre à gauche pour voir les détails.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2">
            <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
            <p className="italic">{selectedJob.company}</p>
            <p>{selectedJob.salary ? `${formatSalary(selectedJob.salary)} €` : "Salaire non défini"}</p>
            <p className="">{selectedJob.description || "Pas de description disponible"}</p>
            <p>{formatDate(selectedJob.postedDate)}</p>

            <hr className="my-2 border-t border-gray-900" />

            <div className="flex flex-col md:flex-row gap-2">
                <Link className="block w-fit p-2 md:p-3 font-bold text-white bg-blue-500 hover:bg-cyan-400 rounded-lg shadow-md shadow-blue-900/100 hover:shadow-cyan-400/100" to={`/jobs/${selectedJob.id}`}>En savoir plus</Link>
                <button 
                    className={`block w-fit p-2 md:p-3 font-bold text-white rounded-lg shadow-md 
                        ${user && user.role === "Candidate" 
                            ? "cursor-pointer bg-blue-500 hover:bg-cyan-400 shadow-blue-600/100 hover:shadow-cyan-400/100" 
                            : "bg-gray-400 shadow-md shadow-gray-700/100 cursor-not-allowed line-through"}`}
                    disabled={!user || user.role === "Recruiter"}
                >
                    Postuler
                </button>
            </div>
            {(!user || user.role === "Recruiter") && <p className="text-sm italic text-red-700">Vous devez être connecté en tant que chercheur d'emploi pour postuler</p>}
        </div>
    )
}

export default SelectedJob