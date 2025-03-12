import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../../components/hooks/useAuth"

const LoginView = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch("https://localhost:7103/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                setMessage("L'email ou le mot de passe est invalide.")
            } else {
                const data = await response.json()
                login(data.token)
                setMessage("Connexion réussie !")
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto py-20 w-full max-w-[750px] flex flex-col items-center gap-y-15 text-center bg-white shadow-xl shadow-blue-400/50 rounded-xl">
            <h1>Profitez des nouvelles opportunités</h1>

            {message && <p className="text-gray-400">{message}</p>}

            <form onSubmit={handleLogin} className="w-full max-w-[350px] flex flex-col gap-y-5">
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-medium">Adresse email</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="py-2 px-4 mx-auto w-full text-center border border-blue-300 focus:outline-none rounded-xl"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-medium">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="py-2 px-4 mx-auto w-full text-center border border-blue-300 focus:outline-none rounded-xl"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button 
                    className="cursor-pointer py-3 font-bold text-white bg-blue-500 hover:bg-cyan-400 shadow-md shadow-blue-900 hover:shadow-cyan-600 rounded-lg" 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </form>
        </div>
    )
}

export default LoginView