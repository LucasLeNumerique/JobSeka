import { BrowserRouter, Routes, Route } from "react-router"

import HomeLayout from "./layouts/MainLayout"
import HomeView from "./views/HomeView"
import JobView from "./views/JobView"
import RegisterView from "./views/Auth/RegisterView"
import LoginView from "./views/Auth/LoginView"
import CompaniesView from "./views/CompaniesView"
import CompanyView from "./views/CompanyView"
import AccountView from "./views/AccountView"
import AdminView from "./views/Admin/AdminView"
import ApplicationView from "./views/Candidate/ApplicationView"
import CreateJobView from "./views/Recruiter/CreateJobView"

import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <div className="bg-linear-to-r from-white to-blue-50 text-gray-900">
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route index element={<HomeView />} />
            <Route path="jobs/:id" element={<JobView />} />
            <Route path="societes" element={<CompaniesView />} />
            <Route path="societes/:id" element={<CompanyView />} />
            <Route path="creation-de-compte" element={<RegisterView />} />
            <Route path="connexion" element={<LoginView />} />
            <Route path="mon-compte" element={<ProtectedRoute><AccountView /></ProtectedRoute>} />
            <Route path="admin" element={<ProtectedRoute><AdminView /></ProtectedRoute>} />
            <Route path="publier-une-offre" element={<ProtectedRoute><CreateJobView /></ProtectedRoute>} />
            <Route path="candidature/:id" element={<ProtectedRoute><ApplicationView /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App