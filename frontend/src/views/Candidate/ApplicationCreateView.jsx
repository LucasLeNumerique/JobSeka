import { useEffect, useState } from "react";
import { useAuth } from "../../components/Auth/useAuth";
import { useNavigate, useParams } from "react-router";

const ApplicationCreateView = () => {
    const { user, token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [company, setCompany] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [checking, setChecking] = useState(true);

    const [message, setMessage] = useState("");
    const [hasApplied, setHasApplied] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!user || user.role !== "Candidate") {
            navigate("/");
            return;
        }

        const fetchJobAndCompany = async () => {
            try {
                const jobRes = await fetch(`https://localhost:7103/api/jobs/${id}`);
                if (!jobRes.ok) throw new Error("Erreur lors de la récupération de l'offre.");
                const jobData = await jobRes.json();
                setJob(jobData);

                if (jobData.companyId) {
                    const companyRes = await fetch(`https://localhost:7103/api/company/${jobData.companyId}`);
                    if (companyRes.ok) {
                        const companyData = await companyRes.json();
                        setCompany(companyData);
                    }
                }
            } catch (err) {
                setError("Erreur lors du chargement de l'offre.");
            } finally {
                setLoading(false);
            }
        };

        const checkIfAlreadyApplied = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7103/api/applications/has-applied?candidateId=${user.userId}&jobId=${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (!res.ok) throw new Error("Erreur de vérification");
                const data = await res.json();
                setHasApplied(data.hasApplied);
            } catch {
                setError("Impossible de vérifier votre statut de candidature.");
            } finally {
                setChecking(false);
            }
        };

        fetchJobAndCompany();
        checkIfAlreadyApplied();
    }, [id, user, token, navigate]);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError("");
        const payload = {
            candidateId: user.userId,
            jobId: parseInt(id),
            message,
        };

        try {
            const res = await fetch("https://localhost:7103/api/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }

            setSuccess("Votre candidature a été envoyée avec succès !");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setError(err.message || "Erreur lors de la soumission.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main>
            {loading || checking ? (
                <p className="text-center italic">Chargement...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : hasApplied ? (
                <p className="text-center text-red-600 font-semibold text-lg">
                    Vous avez déjà postulé à cette offre.
                </p>
            ) : job ? (
                <div>
                    <div className="flex flex-col gap-y-3">
                        <h1 className="text-2xl font-bold">Candidature pour le poste : {job.title}</h1>
                        <p className="italic text-gray-600">Entreprise : {company?.name || "Inconnue"}</p>
                        <p>Location : {job.location}</p>
                    </div>

                    <div className="mt-4">
                        <label className="block font-medium mb-1">Lettre de motivation</label>
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows={6}
                            placeholder="Expliquez pourquoi vous êtes intéressé(e) par ce poste..."
                        ></textarea>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="cursor-pointer block w-fit p-2 md:p-3 font-bold text-white bg-blue-500 transition hover:bg-cyan-400 rounded-lg shadow-md shadow-blue-900 hover:shadow-cyan-600 mt-4"
                    >
                        {submitting ? "Envoi en cours..." : "Envoyer ma candidature"}
                    </button>

                    {success && (
                        <p className="mt-4 text-green-600 font-medium text-center">{success}</p>
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-500">Aucun détail de l'offre trouvé.</p>
            )}
        </main>
    );
};

export default ApplicationCreateView;