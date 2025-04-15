import { useEffect, useState } from "react"
import { useAuth } from "../../components/Auth/useAuth";
import { useNavigate } from "react-router";

const CreateJobView = () => {
    const { user, token } = useAuth()
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
    })
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user || user.role !== "Recruiter") {
            navigate("/");
            return;
        }
    }, [user, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            salary: formData.salary ? parseFloat(formData.salary) : null,
            recruiterId: parseInt(user.userId),
        };

        try {
            const response = await fetch("https://localhost:7103/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setMessage("Publication réussie !")
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                const errorData = await response.json()
                setMessage(errorData.message || "Erreur lors de la soumission")
            }
        } catch (error) {
            console.error("Erreur : ", error)
            setMessage("Une erreur réseau s'est produite")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-y-5">
            <h1>Publier une offre de poste</h1>

            {message && <p className="text-gray-400">{message}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                <div className="splitRow flex flex-col md:grid md:grid-cols-12 gap-5">
                    <div className="field col-span-7 flex flex-col gap-2">
                        <label className="text-xl font-medium">Titre du poste</label>
                        <input
                            type="text"
                            placeholder="Exemple : développeur web"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full py-2 px-4 mx-auto w-full border border-blue-300 focus:outline-none rounded-xl"
                        />
                    </div>
                    <div className="field col-span-5 flex flex-col gap-2">
                        <label className="text-xl font-medium">Société</label>
                        <input
                            type="text"
                            placeholder="Nom de la société"
                            name="company"
                            value={user.companyName || `Votre email : ${user.email}`}
                            readOnly
                            className="cursor-not-allowed w-full py-2 px-4 mx-auto bg-gray-100 w-full border border-blue-300 focus:outline-none rounded-xl"
                        />
                    </div>
                </div>

                <div className="splitRow flex flex-col md:grid md:grid-cols-12 gap-5">
                    <div className="field col-span-8 flex flex-col gap-2">
                        <label className="text-xl font-medium">Localisation</label>
                        <input
                            type="text"
                            placeholder="Exemple : Paris"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full py-2 px-4 mx-auto w-full border border-blue-300 focus:outline-none rounded-xl"
                        />
                    </div>
                    <div className="field col-span-4 flex flex-col gap-2">
                        <label className="text-xl font-medium">Salaire annuel (€)</label>
                        <input
                            type="number"
                            min="1"
                            placeholder="Exemple : 30000"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            className="w-full py-2 px-4 mx-auto w-full border border-blue-300 focus:outline-none rounded-xl"
                        />
                    </div>
                </div>

                <div className="longRow">
                    <div className="field flex flex-col gap-2">
                        <label className="text-xl font-medium">Description du poste</label>
                        <textarea
                            placeholder="Entreprise, activités, missions, profil idéal..."
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="min-h-[25vh] max-h-[35vh] w-full py-2 px-4 mx-auto w-full border border-blue-300 focus:outline-none rounded-xl"
                        />
                    </div>
                </div>

                <div className="longRow">
                    <button 
                        className="cursor-pointer block w-full max-w-[350px] sm:max-w-none sm:w-fit mx-auto py-3 px-8 font-bold text-white transition bg-blue-500 hover:bg-cyan-400 shadow-md shadow-blue-900 hover:shadow-cyan-600 rounded-lg" 
                        type="submit"
                    >
                        {loading ? "Publication en cours..." : "Poster cette offre"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateJobView