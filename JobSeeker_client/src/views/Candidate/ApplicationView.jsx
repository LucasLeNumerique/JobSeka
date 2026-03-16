import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { formatDate, formatSalary } from "../../utils/formatters";

const ApplicationView = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(`https://localhost:7103/api/applications/${id}`);
        if (!res.ok) throw new Error("Application introuvable");
        const data = await res.json();
        setApplication(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">Erreur : {error}</p>;
  if (!application) return <p>Aucune donnée de candidature.</p>;

  const { job, candidate, message, createdAt } = application;

  return (
        <main className="h-full relative flex flex-col gap-y-5">
            <div className="flex justify-between items-center">
                <Link to="/mon-compte" className="flex justify-center items-center gap-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden sm:inline">Retour au profil</span> 
                </Link>
                <h2 className="text-sm text-gray-600">Envoyée le : {formatDate(createdAt)}</h2>
            </div>

            <h1 className="text-2xl font-bold">{job.title}</h1>
            <h2 className="text-gray-500">Entreprise : {job.company?.name || "Inconnue"}</h2>

            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-y-8 gap-x-5">
                <div className="flex flex-col gap-y-5 col-span-3">
                    <div>
                        <h3 className="font-semibold">Email du candidat</h3>
                        <p className="text-blue-700">{candidate.email}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Message du candidat</h3>
                        <p>{message || "Aucun message"}</p>
                    </div>
                </div>
                <hr className="block sm:hidden" />
                <div className="sm:mx-auto sm:p-3 flex flex-col gap-y-3 col-span-2 max-w-[425px] sm:border sm:rounded-lg">
                    <h3>Rappel du poste</h3>
                    <div>
                        <h4 className="font-semibold">Description du poste</h4>
                        <p>{job.description || "Pas de description"}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Salaire</h4>
                        <p>{job.salary ? `${formatSalary(job.salary)} € / an` : "Non précisé"}</p>
                    </div>
                </div>
            </div>
        </main>
  );
};

export default ApplicationView;