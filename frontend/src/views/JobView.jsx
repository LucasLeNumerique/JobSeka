import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { formatSalary, formatDate } from "../utils/formatters"

const JobView = () => {
    const { id } = useParams()
    const [job, setJob] = useState(null)
    const [company, setCompany] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchJobAndCompany = async () => {
            try {
                const jobResponse = await fetch(`https://localhost:7103/api/jobs/${id}`)
                const jobData = await jobResponse.json()
                setJob(jobData)

                if (jobData.companyId) {
                    const companyResponse = await fetch(`https://localhost:7103/api/company/${jobData.companyId}`)
                    const companyData = await companyResponse.json()
                    setCompany(companyData)
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchJobAndCompany()
    }, [id])

    if (loading) {
        return (
            <main className="relative h-full">
                <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 italic text-2xl font-medium">Chargement de l'offre...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="relative h-full">
                <p className="text-center italic">
                    Une erreur est survenue lors du chargement de l'offre de poste.
                    Erreur : {error}
                </p>
            </main>
        )
    }

    if (!job) {
        return <p className="text-center text-gray-500">Aucune offre trouvée.</p>
    }

    return (
        <main className="h-full relative flex flex-col gap-y-5">
            <div className="flex flex-col md:flex-row md:justify-between gap-y-2">
                <div className="flex gap-x-5">
                    <Link to="/" className="flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <h1>{job.title}</h1>
                </div>
                <h2>{formatDate(job.postedDate)}</h2>
            </div>
            <h2 className="text-gray-400">Société : {company?.name || "Inconnue"}</h2>
            <p>{job.description || "Pas de description disponible"}</p>
            <p>{job.salary ? `Salaire annuel : ${formatSalary(job.salary)} €` : "Salaire annuel : non défini"}</p>
        </main>
    )
}

export default JobView