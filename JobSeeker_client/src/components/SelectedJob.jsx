const SelectedJob = ({ selectedJob }) => {
    if (!selectedJob) {
        return (
            <div>
                <h2>Détails de l'offre</h2>
                <p>Sélectionnez une offre à gauche pour voir les détails.</p>
            </div>
        )
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
        <div>
            <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
            <p className="italic">{selectedJob.company}</p>
            <p>{selectedJob.salary ? `${formatSalary(selectedJob.salary)} €` : "Salaire non défini"}</p>
            <p className="mt-4">{selectedJob.description || "Pas de description disponible"}</p>
            <p>{formatDate(selectedJob.postedDate)}</p> {/* Format the postedDate */}
        </div>
    )
}

export default SelectedJob