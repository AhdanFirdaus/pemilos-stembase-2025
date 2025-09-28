// resources/js/Components/Elements/ActionMenu.jsx
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

export default function ActionMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Tutup menu kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Tombol trigger */}
      <button
        className="p-1 rounded hover:bg-gray-100"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreHorizontal size={16} className="text-gray-500" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100"
          >
            Edit
          </button>
          <div className="border-t border-gray-200" />
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-3 text-sm font-medium text-pink-600 hover:bg-pink-50"
          >
            Hapus
          </button>
        </div>
      )}
    </div>
  );
}
