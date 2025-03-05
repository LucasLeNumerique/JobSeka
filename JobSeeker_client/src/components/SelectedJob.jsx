import { Link } from "react-router"
import { formatSalary, formatDate } from "../utils/formatters"

const SelectedJob = ({ selectedJob }) => {
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
            <Link className="block w-fit py-3 px-4 font-bold text-white bg-cyan-600 hover:bg-cyan-400 rounded-lg" to={`/jobs/${selectedJob.id}`}>En savoir plus</Link>
        </div>
    )
}

export default SelectedJob