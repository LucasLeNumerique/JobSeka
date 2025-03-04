import { BrowserRouter, Routes, Route } from "react-router"
import HomeLayout from "./layouts/MainLayout"
import HomeView from "./views/HomeView"

const App = () => {
  return (
    <div className="bg-linear-to-r from-white to-blue-50 text-gray-900">
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route index element={<HomeView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App