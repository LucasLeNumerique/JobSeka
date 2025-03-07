import { Outlet } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"

const HomeLayout = () => {
    return (
        <div className="h-screen lg:flex flex-col justify-between">
            <Header />
            <div className="py-5 lg:py-0 lg:h-3/4 mx-auto w-full max-w-[1250px] px-2 md:px-5">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default HomeLayout