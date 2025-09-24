import { useState } from "react";
import { Link } from "@inertiajs/react";
import {
  Home,
  Users,
  User,
  ChevronDown,
  ChevronUp,
  LogOut,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [userDropdown, setUserDropdown] = useState(false);

  return (
    <aside
      className={`bg-white  h-screen flex flex-col justify-between transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between p-4">
          {/* Logo hanya muncul jika open */}
          {isOpen && (
            <div className="flex items-center gap-2">
              <img src="/img/stemba.png" alt="Logo" className="w-8 h-8" />
              <span className="font-bold text-lg">Pemilos</span>
            </div>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-gray-600 focus:outline-none ${
              isOpen ? "" : "w-full flex justify-center"
            }`}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-4 space-y-2">
          {/* Dashboard */}
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-100"
          >
            <Home size={20} />
            {isOpen && <span>Dashboard</span>}
          </Link>

          {/* Paslon */}
          <Link
            href="/admin/paslon"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-100"
          >
            <Users size={20} />
            {isOpen && <span>Paslon</span>}
          </Link>

          {/* User Dropdown */}
          <div>
            <button
              onClick={() => setUserDropdown(!userDropdown)}
              className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-100"
            >
              <div className="flex items-center gap-3">
                <User size={20} />
                {isOpen && <span>User</span>}
              </div>
              {isOpen &&
                (userDropdown ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                ))}
            </button>
            {userDropdown && isOpen && (
              <div className="ml-10 mt-1 space-y-1">
                <Link
                  href="/admin/siswa"
                  className="block px-2 py-1 rounded-lg text-gray-600 hover:bg-purple-50"
                >
                  Siswa
                </Link>
                <Link
                  href="/admin/guru"
                  className="block px-2 py-1 rounded-lg text-gray-600 hover:bg-purple-50"
                >
                  Guru
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4">
        <Link
          href="/logout"
          method="post"
          as="button"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-pink-200 text-pink-600 font-medium hover:bg-pink-300"
        >
          <LogOut size={20} />
          {isOpen && <span>Keluar</span>}
        </Link>
      </div>
    </aside>
  );
}
