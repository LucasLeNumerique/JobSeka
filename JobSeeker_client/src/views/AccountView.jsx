import { useEffect, useState } from "react";
import { useAuth } from "../components/Auth/useAuth";
import { Link } from "react-router";
import { formatSalary, formatDate } from "../utils/formatters"

const AccountView = () => {
    const { user, logout } = useAuth();

    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const roles = {
        Candidate: "chercheur d'emploi",
        Recruiter: "recruteur",
        Admin: "admin",
    };

    const userRoleText = roles[user.role] || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user.role === "Candidate") {
                    const res = await fetch(`https://localhost:7103/api/applications/candidate/${user.userId}`);
                    const data = await res.json();
                    setApplications(data);
                }

                if (user.role === "Recruiter") {
                    const res = await fetch(`https://localhost:7103/api/jobs/recruiter/${user.userId}`);
                    const data = await res.json();
                    setJobs(data);
                }
            } catch (err) {
                console.error("Erreur de chargement :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    return (
        <div className="flex flex-col gap-y-6">
            <h1>Mon compte</h1>
            <p className="text-xl">Adresse email : <br /> {user.email}</p>
            <p className="text-xl">Rôle : {userRoleText}</p>
            {user.role === "Recruiter" && user.companyName && (
                <p className="text-xl">Société : {user.companyName}</p>
            )}

            <button
                onClick={logout}
                className="cursor-pointer w-fit px-8 py-3 font-bold text-red-500 hover:text-red-600 border border-red-300 hover:border-red-600 rounded-lg"
            >
                Se déconnecter
            </button>

            {loading ? (
                <p className="italic">Chargement en cours...</p>
            ) : user.role === "Candidate" ? (
                <div>
                    <h2 className="text-xl font-semibold my-4">Mes candidatures pour ces postes :</h2>
                    {applications.length === 0 ? (
                        <p>Aucune candidature envoyée.</p>
                    ) : (
                        <ul className="flex flex-col sm:flex-row gap-4">
                            {applications.map(app => (
                                <li key={app.id} className="cursor-pointer border border-gray-600 hover:border-cyan-400 rounded-lg shadow-sm">
                                    <Link to={`/applications/${app.id}`} className="block p-4">
                                        <h3 className="font-semibold text-lg">
                                                {app.job.title} - {app.job.company?.name || "Entreprise inconnue"}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Candidature envoyée le {formatDate(app.createdAt)}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : user.role === "Recruiter" ? (
                <div>
                    <h2 className="text-xl font-semibold my-4">Mes offres publiées</h2>
                    {jobs.length === 0 ? (
                        <p>Aucune offre publiée.</p>
                    ) : (
                        <ul className="list-disc pl-6">
                            {jobs.map(job => (
                                <li key={job.id}>
                                    <Link to={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
                                        {job.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default AccountView;