import React from "react";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { X } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function FormSiswa({ onClose, type, initialData, onSuccess }) {
  const { data, setData, post, put, processing, errors } = useForm({
    nama: initialData?.nama || "",
    kelas: initialData?.kelas || "",
    nis: initialData?.nis || "",
  });

  const isEditing = !!initialData?.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "siswa") {
      if (isEditing) {
        put(`/admin/siswa/${initialData.id}`, {
          preserveState: true,
          onSuccess: () => {
            onClose();
            onSuccess("edit", data.nama);
          },
        });
      } else {
        post("/admin/siswa", {
          preserveState: true,
          onSuccess: () => {
            onClose();
            onSuccess("add", data.nama);
          },
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-600/20 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(75, 85, 99, 0.2)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-6 text-purple-700">
            {isEditing ? "Edit Siswa" : "Tambah Siswa"}
          </h2>

          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Nama */}
            <Input
              label="Nama"
              name="nama"
              placeholder="Ex: John Doe"
              value={data.nama}
              onChange={(e) => setData("nama", e.target.value)}
            />
            {errors.nama && (
              <div className="text-red-500 text-sm">{errors.nama}</div>
            )}

            {/* Kelas */}
            {type === "siswa" && (
              <>
                <Input
                  label="Kelas"
                  name="kelas"
                  placeholder="Ex: XII SIJA 1"
                  value={data.kelas}
                  onChange={(e) => setData("kelas", e.target.value)}
                />
                {errors.kelas && (
                  <div className="text-red-500 text-sm">{errors.kelas}</div>
                )}

                {/* NIS */}
                <Input
                  label="NIS"
                  name="nis"
                  placeholder="Ex: 234119221"
                  value={data.nis}
                  onChange={(e) => setData("nis", e.target.value)}
                />
                {errors.nis && (
                  <div className="text-red-500 text-sm">{errors.nis}</div>
                )}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose} type="button" className="cursor-pointer">
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={processing} className="cursor-pointer">
              {isEditing ? "Simpan" : "Tambah"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}