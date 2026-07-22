// src/pages/admin/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import NavAdmin from "./NavAdmin";

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <header className="sticky top-0 z-40 shrink-0 flex items-center justify-between  px-6 md:px-16 py-5">
        <NavAdmin/>
      </header>
      <main className="flex-1 px-6 md:px-24 py-10">
        <Outlet />
      </main>
    </div>
  );
}