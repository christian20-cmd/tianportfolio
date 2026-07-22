// src/pages/admin/AdminApp.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import ProjectsList from "./ProjectsList";
import ProjectForm from "./ProjectForm";

export default function AdminApp() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<ProjectsList />} />
        <Route path="nouveau" element={<ProjectForm />} />
        <Route path=":id/modifier" element={<ProjectForm />} />
      </Route>
    </Routes>
  );
}