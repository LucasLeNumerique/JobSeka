import { Outlet } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SideMenu from "../components/SideMenu"

const HomeLayout = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <SideMenu />
            <div className="relative py-5 lg:py-0 lg:h-[75vh] mx-auto w-full max-w-[1250px] px-2 md:px-12">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default HomeLayout