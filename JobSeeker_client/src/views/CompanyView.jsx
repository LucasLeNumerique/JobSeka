import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { formatDate, formatSalary } from "../utils/formatters"

const CompanyView = () => {
    const { id } = useParams()
    const [company, setCompany] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://localhost:7103/api/company/${id}/details`)
            .then(res => res.json())
            .then(data => {
                setCompany(data)
                setLoading(false)
            })
    }, [id])

    if (loading) return <p className="text-center mt-10">Chargement de l'entreprise...</p>
    if (!company) return <p className="text-center mt-10 text-red-500">Entreprise non trouvée.</p>

    return (
        <main>
            <div className="md:text-center">
                <h1>{company.name}</h1>
                <p>{company.description || "Pas de description disponible."}</p>
            </div>

            <h2>Offres d'emploi</h2>
            {company.jobs?.length ? (
                <div className="flex gap-4 md:gap-5">
                    {company.jobs.map(job => (
                        <Link 
                            to={`/jobs/${job.id}`} 
                            key={job.id}
                            className=""
                        >
                            <div className="p-2 md:p-4 border border-gray-600 hover:border-cyan-400 hover:text-cyan-400 rounded">
                                <h3 className="mb-2 text-lg font-medium leading-5">{job.title}</h3>
                                <p className="text-sm italic">Publié le {formatDate(job.postedDate)}</p>
                                {job.salary && <p>Salaire : {formatSalary(job.salary)} €</p>}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="italic">Aucune offre d'emploi disponible.</p>
            )}
        </main>
    )
}

export default CompanyView