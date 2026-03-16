import ProfileIcon from "../assets/images/Logo.svg"

const Footer = () => {
    return (
        <footer className="h-20 flex justify-center items-center gap-x-2 bg-linear-to-r from-blue-500/15 to-cyan-500/15">
            Développé par Lucas SCH
            <img src={ProfileIcon} alt="Logo" className="w-6 h-6 rounded-full" />
        </footer>
    )
}

export default Footer