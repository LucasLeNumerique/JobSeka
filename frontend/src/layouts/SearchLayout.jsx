import { Outlet } from "react-router"
import Header from "../components/Header"
import SideMenu from "../components/SideMenu"

const SearchLayout = () => {
    return (
        <div className="min-h-screen justify-between">
            <Header />
            <SideMenu />
            <div className="py-5 lg:py-0 mx-auto w-full max-w-[1250px] px-2 md:px-12">
                <Outlet />
            </div>
        </div>
    )
}

export default SearchLayout