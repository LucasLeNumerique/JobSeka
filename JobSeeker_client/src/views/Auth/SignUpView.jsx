import { useSearchParams } from "react-router"

const SignUpView = () => {
    const [searchParams] = useSearchParams()
    const role = searchParams.get("role") || "candidat"

    return (
        <div className="mx-auto py-20 w-full max-w-[750px] flex flex-col items-center gap-y-15 text-center bg-white shadow-xl shadow-blue-400/50 rounded-xl">
            <h1>{role ==="recruteur"? "Je cherche de nouveaux talents" : "Je trouve mon futur emploi"}</h1>
            <form className="w-full max-w-[350px] flex flex-col gap-y-5">
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-medium">Adresse email</label>
                    <input 
                        type="text"
                        className="py-2 px-4 mx-auto w-full text-center border border-blue-300 focus:outline-none rounded-xl"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-medium">Mot de passe</label>
                    <input
                        type="password"
                        className="py-2 px-4 mx-auto w-full text-center border border-blue-300 focus:outline-none rounded-xl"
                    />
                </div>
                <button className="cursor-pointer py-3 font-bold text-white bg-blue-400 hover:bg-blue-700 rounded-xl" type="submit">Créer mon compte</button>
            </form>
        </div>
    )
}

export default SignUpView