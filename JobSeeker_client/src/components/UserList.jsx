import { useEffect, useState } from "react"

const UserList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://localhost:7103/api/users')
        .then(response => response.json())
        .then(data => {
            setUsers(data)
            setLoading(false)
        })
        .catch(error => {
            console.error("Erreur de chargement", error)
            setLoading(false)
        })
    }, [])

    const deleteUser = async (userId) => {
        if (!window.confirm("Vous confirmez vouloir supprimer cet utilisateur ?")) return
    
        try {
            const response = await fetch(`https://localhost:7103/api/users/${userId}`, { method: "DELETE" })
            if (response.ok) alert("Utilisateur supprimé avec succès") 
        } catch (error) {
            console.error("Erreur : ", error)
        }
    }

    if (loading) {
        return (
            <div className="relative w-full min-h-[200px] h-full">
                <p className="absolute top-1/2 -translate-y-1/2 w-full text-center italic text-2xl font-medium">Les utilisateurs en chargement...</p>
            </div>
        )
    }

    const candidates = users.filter(user => user.role === "Candidate")
    const recruiters = users.filter(user => user.role === "Recruiter")

    return (
        <>
            <div className="flex flex-col gap-3">
                <h2>Liste des candidats</h2>
                <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {candidates.length > 0 ? (
                        candidates.map(user => (
                            <article 
                                key={user.id}
                                className="relative cursor-pointer p-2 lg:px-4 flex justify-between items-center gap-2 border border-gray-600 hover:border-cyan-400 shadow-xl hover:shadow-cyan-600/50 rounded-xl"
                            >
                                <p className="text-sm sm:text-base">{user.email}</p>
                                <button onClick={() => deleteUser(user.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cursor-pointer text-red-400 size-8 hover:text-red-600">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </article>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">Il n'y a pas de candidats.</p>
                    )}
                </div>
            </div>

            <hr className="my-4" />

            <div className="flex flex-col gap-3">
                <h2>Liste des recruteurs</h2>
                <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {recruiters.length > 0 ? (
                        recruiters.map(user => (
                            <article 
                                key={user.id}
                                className="relative cursor-pointer p-2 lg:px-4 flex justify-between items-center gap-2 border border-gray-600 hover:border-cyan-400 shadow-xl hover:shadow-cyan-600/50 rounded-xl"
                            >
                                <p className="text-sm sm:text-base">{user.email}</p>
                                <button onClick={() => deleteUser(user.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cursor-pointer text-red-400 size-8 hover:text-red-600">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </article>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">Il n'a pas de recruteurs</p>
                    )}
                </div>
            </div>

        </>
    )
}

export default UserList