import { useEffect, useState } from "react";

const SearchJobsView = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters and search inputs
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [salaryFilter, setSalaryFilter] = useState([0, 100000]); // example range
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    useEffect(() => {
        async function fetchJobs() {
        try {
            const jobsResponse = await fetch("https://localhost:7103/api/jobs");
            const companiesResponse = await fetch("https://localhost:7103/api/company");
            const jobsData = await jobsResponse.json();
            const companiesData = await companiesResponse.json();

            const jobsWithCompany = jobsData.map(job => {
            const company = companiesData.find(c => c.id === job.companyId);
            return { ...job, companyName: company?.name || "Société inconnue" };
            });

            setJobs(jobsWithCompany);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        }

        fetchJobs();
    }, []);

    // Filter and search logic
    useEffect(() => {
        let filtered = jobs.filter(job => {
        const matchesSearch = 
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesLocation = locationFilter ? job.location === locationFilter : true;
        const matchesSalary = job.salary >= salaryFilter[0] && job.salary <= salaryFilter[1];

        return matchesSearch && matchesLocation && matchesSalary;
        });

        setFilteredJobs(filtered);
        setCurrentPage(1); // Reset page when filters change
    }, [searchTerm, locationFilter, salaryFilter, jobs]);

    // Pagination calculations
    const lastIndex = currentPage * jobsPerPage;
    const firstIndex = lastIndex - jobsPerPage;
    const currentJobs = filteredJobs.slice(firstIndex, lastIndex);

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="mt-20 flex flex-col gap-y-2 md:gap-y-5">
            <h1>Rechercher un poste</h1>
            <div className="sticky top-0 z-10 p-4 flex flex-col gap-y-2 md:gap-y-4 bg-white shadow-xl rounded-lg">
                {/* Search bar */}
                <input 
                    type="text"
                    placeholder="Rechercher par titre, entreprise, lieu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />

                {/* Location filter */}
                <select 
                    value={locationFilter} 
                    onChange={e => setLocationFilter(e.target.value)} 
                    className="w-full border p-2 rounded"
                >
                    <option value="">Tous les lieux</option>
                    <option value="Paris">Paris</option>
                    <option value="Cesson">Cesson</option>
                    <option value="Lyon">Lyon</option>
                </select>

                {/* Salary range */}
                <div className="flex gap-4">
                    <div>
                    <label className="block">Salaire minimum:</label>
                    <input 
                        type="number" 
                        value={salaryFilter[0]} 
                        onChange={e => setSalaryFilter([Number(e.target.value), salaryFilter[1]])}
                        min={0}
                        className="border p-1 rounded w-full"
                    />
                    </div>
                    <div>
                    <label className="block">Salaire maximum:</label>
                    <input 
                        type="number" 
                        value={salaryFilter[1]} 
                        onChange={e => setSalaryFilter([salaryFilter[0], Number(e.target.value)])}
                        min={salaryFilter[0]}
                        className="border p-1 rounded w-full"
                    />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {/* Job results */}
                {currentJobs.length === 0 ? (
                    <p>Aucune offre ne correspond à votre recherche.</p>
                ) : (
                    currentJobs.map(job => (
                    <article key={job.id} className="border p-4 rounded shadow">
                        <h3 className="font-bold">{job.title}</h3>
                        <p>Entreprise : {job.companyName}</p>
                        <p>Lieu : {job.location || "Non précisé"}</p>
                        <p>Salaire : {job.salary ? `${job.salary} € / an` : "Non précisé"}</p>
                    </article>
                    ))
                )}
            </div>


            {/* Pagination */}
            <div className="flex justify-center items-center gap-4">
                <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
                >
                Précédent
                </button>

                <span>Page {currentPage} sur {Math.ceil(filteredJobs.length / jobsPerPage)}</span>

                <button 
                disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage)}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
                >
                Suivant
                </button>
            </div>
        </div>
    );
};

export default SearchJobsView;