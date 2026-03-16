import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(() => {
        const savedToken = localStorage.getItem("token")
        if (!savedToken) return null

        try {
            const payload = JSON.parse(atob(savedToken.split(".")[1]))
            return {
                email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                companyName: payload["companyName"] || null,
                userId: payload["userId"]
            }
        } catch (error) {
            console.error("Error decoding token:", error)
            return null
        }
    })

    const login = (newToken) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
        try {
            const payload = JSON.parse(atob(newToken.split(".")[1]))
            setUser({
                email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                companyName: payload["companyName"] || null,
                userId: payload["userId"]
            })
        } catch (error) {
            console.error("Error decoding token:", error)
            setUser(null)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}