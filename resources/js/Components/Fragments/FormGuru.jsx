import React from "react";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { X } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function FormGuru({ onClose, type, initialData, onSuccess }) {
  const { data, setData, post, put, processing, errors } = useForm({
    nama: initialData?.nama || "",
    nip: initialData?.nip || "",
  });

  const isEditing = !!initialData?.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "guru") {
      if (isEditing) {
        put(`/admin/guru/${initialData.id}`, {
          onSuccess: () => {
            onClose();
            onSuccess("edit", data.nama);
          },
          // preserveState: false,
        });
      } else {
        post("/admin/guru", {
          onSuccess: () => {
            onClose();
            onSuccess("add", data.nama);
          },
          preserveState: true,
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
            {isEditing ? "Edit Guru" : "Tambah Guru"}
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

            {/* NIP */}
            {type === "guru" && (
              <>
                <Input
                  label="NIP"
                  name="nip"
                  placeholder="Ex: 1234567890"
                  value={data.nip}
                  onChange={(e) => setData("nip", e.target.value)}
                />
                {errors.nip && (
                  <div className="text-red-500 text-sm">{errors.nip}</div>
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