import { useEffect, useState } from "react"
import { Link } from "react-router"

const CompaniesView = () => {
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://localhost:7103/api/company")
            .then(res => res.json())
            .then(data => {
                setCompanies(data)
                setLoading(false)
            })
    }, [])

    if (loading) return <p className="text-center mt-10">Chargement des entreprises...</p>

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Entreprises</h1>
            <div className="flex flex-row flex-wrap justify-center items-center md:grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                {companies.map(company => (
                    <Link 
                        to={`/societes/${company.id}`}
                        key={company.id}    
                    >
                        <div 
                            className="cursor-pointer min-w-[200px] min-h-[125px] flex flex-col justify-between p-3 lg:p-4 gap-2 border border-gray-600 hover:border-cyan-400 shadow-xl hover:shadow-cyan-600/50 rounded-xl"
                        >
                            <h2 className="leading-6">{company.name}</h2>
                            <div className="px-3 h-8 flex justify-center items-center gap-x-1 text-white bg-blue-500 transition hover:bg-cyan-400 rounded-full shadow-md shadow-blue-900 hover:shadow-cyan-600">
                                Découvrir
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}

export default CompaniesView