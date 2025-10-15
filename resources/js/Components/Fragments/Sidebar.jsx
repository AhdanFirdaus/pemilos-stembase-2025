import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  Home,
  Users,
  GraduationCap,
  School,
  LogOut,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { url } = usePage();

  const linkClass = (path) =>
    `flex items-center gap-3 py-2 rounded-lg transition-all duration-200 ${
      url.startsWith(path)
        ? "bg-purple-200 text-purple-800 font-semibold"
        : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
    } ${isOpen ? "px-4 justify-start" : "px-2 justify-center"}`;

  return (
    <aside
      className={`bg-white h-screen flex flex-col justify-between transition-all duration-300 shadow-md ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="p-4">
        <div
          className={`flex items-center ${
            isOpen ? "justify-between" : "justify-center"
          } mb-8`} // tambahin jarak bawah header
        >
          {isOpen && (
            <div className="flex items-center gap-2">
              <img src="/img/stemba.png" alt="Logo" className="w-8 h-8" />
              <span className="font-bold text-lg text-gray-800">Pemilos</span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-purple-700 focus:outline-none p-2 rounded-full hover:bg-purple-100 flex justify-center"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {/* Dashboard */}
          <Link
            href="/admin/dashboard"
            className={linkClass("/admin/dashboard")}
          >
            <Home size={20} className="min-w-[20px]" />
            {isOpen && <span className="text-sm">Dashboard</span>}
          </Link>

          {/* Paslon */}
          <Link href="/admin/paslon" className={linkClass("/admin/paslon")}>
            <Users size={20} className="min-w-[20px]" />
            {isOpen && <span className="text-sm">Paslon</span>}
          </Link>

          {/* Siswa */}
          <Link href="/admin/siswa" className={linkClass("/admin/siswa")}>
            <GraduationCap size={20} className="min-w-[20px]" />
            {isOpen && <span className="text-sm">Siswa</span>}
          </Link>

          {/* Guru */}
          <Link href="/admin/guru" className={linkClass("/admin/guru")}>
            <School size={20} className="min-w-[20px]" />
            {isOpen && <span className="text-sm">Guru</span>}
          </Link>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4">
        <Link
          href="/auth/admin/logout"
          method="post"
          as="button"
          className={`flex items-center gap-2 w-full py-2 rounded-lg transition-all duration-200 ${
            isOpen
              ? "px-4 bg-pink-200 text-pink-700 font-medium hover:bg-pink-300 justify-start"
              : "px-2 justify-center bg-pink-200 text-pink-700 hover:bg-pink-300"
          }`}
        >
          <LogOut size={20} className="min-w-[20px]" />
          {isOpen && <span className="text-sm">Keluar</span>}
        </Link>
      </div>
    </aside>
  );
}
