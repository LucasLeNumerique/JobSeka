import { useState } from "react";
import { useSearchParams } from "react-router"

const RegisterView = () => {
    const [searchParams] = useSearchParams()
    const passedRole = searchParams.get("role") || "candidat"
    const role = searchParams.get("role") === "recruteur" ? "Recruiter" : "Candidate";
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role
    })
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("https://localhost:7103/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("Compte créé avec succès ! Redirection en cours...");
                setTimeout(() => {
                    window.location.href = "/connexion";
                }, 2000);
            } else {
                const errorText = await response.text();
                setMessage(`Erreur : ${errorText}`);
            }
        } catch (error) {
            setMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    }

    return (
        <div className="mx-auto py-20 w-full max-w-[750px] flex flex-col items-center gap-y-15 text-center bg-white shadow-xl shadow-blue-400/50 rounded-xl">
            <h1>{passedRole ==="recruteur"? "Je cherche de nouveaux talents" : "Je trouve mon futur emploi"}</h1>

            {message && <p className="text-gray-400">{message}</p>}

            <form onSubmit={handleSubmit} className="w-full max-w-[350px] flex flex-col gap-y-5">
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-medium">Adresse email</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="py-2 px-4 mx-auto w-full text-center border border-blue-300 focus:outline-none rounded-xl"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-medium">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="py-2 px-4 mx-auto w-full text-center border border-blue-300 focus:outline-none rounded-xl"
                    />
                </div>
                <button className="cursor-pointer py-3 font-bold text-white bg-blue-500 hover:bg-cyan-400 shadow-md shadow-blue-900 hover:shadow-cyan-600 rounded-lg" type="submit">Créer mon compte</button>
            </form>
        </div>
    )
}

export default RegisterView