import { useState } from "react"
import Jobs from "../components/Jobs"
import SelectedJob from "../components/SelectedJob"

const HomeView = () => {
    const [selectedJob, setSelectedJob] = useState(null)

    return (
        <div className="h-full lg:grid grid-rows-10">
            <h1 className="mb-5 lg:mb-0 row-span-2 text-center">JobSeka pour réunir <span className="text-cyan-400">talents</span> et <span className="text-blue-400">recruteurs</span></h1>
            <main className="row-span-8 block lg:grid grid-cols-2 gap-x-10">
                <Jobs setSelectedJob={setSelectedJob} />
                <div className="hidden lg:block lg:p-4 rounded-xl">
                    <SelectedJob selectedJob={selectedJob} />
                </div>
            </main>
        </div>
    )
}

export default HomeView