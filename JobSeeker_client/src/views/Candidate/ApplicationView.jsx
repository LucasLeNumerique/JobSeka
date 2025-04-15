import { useEffect, useState } from "react";
import { useAuth } from "../../components/Auth/useAuth";
import { useNavigate, useParams } from "react-router";

const ApplicationView = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== "Candidate") {
            navigate("/");
            return;
        }

        const fetchJob = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://localhost:7103/api/jobs/${id}`);
                if (!response.ok) throw new Error("Impossible de récupérer l'offre.");

                const data = await response.json();
                setJob(data);
            } catch (err) {
                setError("Erreur lors du chargement de l'offre.");
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id, user, navigate]);

    return (
        <div className="p-4">
            {loading ? (
                <p className="text-center italic">Chargement des détails de l'offre...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : job ? (
                <div>
                    <h1 className="text-2xl font-bold">Candidature pour le poste : {job.title}</h1>
                    <p className="italic text-gray-600">{job.company}</p>
                    <p>{job.location}</p>
                </div>
            ) : (
                <p className="text-center text-gray-500">Aucun détail de l'offre trouvé.</p>
            )}
        </div>
    );
};

export default ApplicationView;