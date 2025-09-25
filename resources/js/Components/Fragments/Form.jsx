import React from "react";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { X } from "lucide-react";

export default function Form({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-600 bg-opacity-20 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(75, 85, 99, 0.2)" }} // Fallback for transparency
        onClick={onClose} // Klik luar modal untuk tutup
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-fade-in">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Form Content */}
        <h2 className="text-lg font-bold mb-4 text-purple-700">Data Ketua</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input label="Nama" placeholder="Ex: John Doe" />
          <Input label="NIS" placeholder="Ex: 234119221" />
          <Input label="Kelas" placeholder="Ex: XII SIJA 1" />
        </div>

        <h2 className="text-lg font-bold mb-4 text-purple-700">Data Wakil</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input label="Nama" placeholder="Ex: Jane Doe" />
          <Input label="NIS" placeholder="Ex: 234119221" />
          <Input label="Kelas" placeholder="Ex: XII SIJA 1" />
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input label="No. Paslon" placeholder="Ex: 1" />
          <div>
            <label className="block text-sm font-medium mb-1">Foto</label>
            <input
              type="file"
              className="w-full text-sm border rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-purple-300 file:text-purple-700 hover:file:bg-purple-400"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Visi</label>
          <textarea
            placeholder="Ex: Mewujudkan OSIS yang aktif, kreatif, dan berintegritas..."
            className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400"
            rows={3}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Misi</label>
          <textarea
            placeholder={`Ex:\n1. Menumbuhkan semangat kebersamaan...\n2. Mengembangkan kegiatan positif...`}
            className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400"
            rows={4}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button variant="primary">Tambah</Button>
        </div>
      </div>
    </div>
  );
}