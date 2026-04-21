import { Routes, Route, Navigate } from 'react-router-dom'
import StudentPortal from './pages/StudentPortal'
import AdminPortal from './pages/AdminPortal'
import ExamPage from './pages/ExamPage'
import LandingPage from './pages/LandingPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/student/*" element={<StudentPortal />} />
      <Route path="/admin/*" element={<AdminPortal />} />
      <Route path="/exam/:examId" element={<ExamPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
