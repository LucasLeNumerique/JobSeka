import { useEffect, useState } from "react";

const Jobs = ({ setSelectedJob }) => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://localhost:7103/api/jobs')
        .then(response => response.json())
        .then(data => {
            setJobs(data)
            setLoading(false)
        })
        .catch(error => {
            console.error("Erreur de chargement", error)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <p className="absolute top-1/2 -translate-y-1/2 text-center italic text-2xl font-medium">Les opportunités sont en train de charger...</p>
    }

    const handleJobClick = (job) => {
        setSelectedJob(job)
    }

    const formatSalary = (salary) => {
        return salary?.toLocaleString("fr-FR");
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="lg:overflow-y-auto flex flex-col gap-y-4">
            {jobs.length === 0 ? (
                <p className="absolute top-1/2 -translate-y-1/2 text-center italic">Il n'y a actuellement pas d'offre à découvrir.</p>
            ) : (
                jobs.map(job => (
                <article 
                    key={job.id} 
                    onClick={() => handleJobClick(job)}
                    className="cursor-pointer p-2 lg:p-4 flex flex-col gap-2 border-2 border-gray-600 hover:border-cyan-400 rounded-lg"
                >
                    <h3>{job.title}</h3>
                    <p className="italic font-bold">{job.company}</p>
                    {job.salary ? <p className="text-base">Salaire annuel : {formatSalary(job.salary)} €</p> : <p>Salaire non défini</p>}
                    <p>{formatDate(job.postedDate)}</p>
                </article>
                ))
            )}
        </div>
    )
}

export default Jobs