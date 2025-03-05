export const formatSalary = (salary) => {
    return salary?.toLocaleString("fr-FR");
};
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};