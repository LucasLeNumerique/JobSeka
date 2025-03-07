import { useEffect, useState } from "react";
import { Link } from "react-router"
import { formatSalary, formatDate } from "../utils/formatters"

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
        return (
            <div className="relative w-full h-full">
                <p className="absolute top-1/2 -translate-y-1/2 text-center italic text-2xl font-medium">Les opportunités sont en train de charger...</p>
            </div>
        )
    }

    const handleJobClick = (job) => {
        setSelectedJob(job)
    }

    return (
        <div className="lg:overflow-y-auto lg:p-4 flex flex-col gap-y-4 rounded-xl">
            {jobs.length === 0 ? (
                <p className="absolute top-1/2 -translate-y-1/2 text-center italic">Il n'y a actuellement pas d'offre à découvrir.</p>
            ) : (
                jobs.map(job => (
                    <article 
                        key={job.id} 
                        onClick={() => handleJobClick(job)}
                        className="relative cursor-pointer p-2 lg:p-4 flex flex-col gap-2 border border-gray-600 hover:border-cyan-400 shadow-xl hover:shadow-cyan-600/50 rounded-xl"
                    >
                        <Link 
                            to={`/jobs/${job.id}`}
                            className="hidden sm:block absolute pt-3 lg:pt-5 top-0 right-3 lg:right-5"
                        >
                            <div className="px-3 h-8 flex justify-center items-center gap-x-1 text-white bg-blue-500 hover:bg-cyan-400 rounded-full shadow-md shadow-blue-900/100 hover:shadow-cyan-600/100">
                                <p className="font-medium">Détails</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </Link>
                        <h3 className="w-full max-w-2/3">{job.title}</h3>
                        <p className="italic font-bold">{job.company}</p>
                        {job.salary ? <p className="text-base">Salaire annuel : {formatSalary(job.salary)} €</p> : <p>Salaire non défini</p>}
                        <p>Publiée le {formatDate(job.postedDate)}</p>
                        <Link 
                            to={`/jobs/${job.id}`}
                            className="sm:hidden pt-3 lg:pt-5"
                        >
                            <div className="px-3 h-8 flex justify-center items-center gap-x-1 text-white bg-cyan-600 hover:bg-cyan-400 rounded-lg">
                                <p className="font-medium">Détails</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
                                </svg>
                            </div>
                        </Link>
                    </article>
                ))
            )}
        </div>
    )
}

export default Jobs