import React from "react";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { X } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function FormPaslon({ onClose, initialData, onSuccess }) {
  console.log("FormPaslon initialData:", initialData); // Debug: Inspect initialData
  // console.table(initialData)

  const isEditing = !!initialData?.id;

  const { data, setData, post, put, processing, errors } = useForm({
    _method: 'PUT',
    ketua_nama: initialData?.ketua || "",
    ketua_nis: initialData?.ketua_nis || "",
    ketua_kelas: initialData?.ketua_kelas || "",
    wakil_nama: initialData?.wakil || "",
    wakil_nis: initialData?.wakil_nis || "",
    wakil_kelas: initialData?.wakil_kelas || "",
    no_paslon: initialData?.pair_number || "", // Ensure string
    foto: null,
    visi: initialData?.vision || "",
    misi: initialData?.mission || "",
  });

  const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  console.log("Submitting data:", data);
  console.log("Foto object:", data.foto);

  if (isEditing) {
    post(`/admin/paslon/${initialData.id}`, {
      forceFormData: true,
    })
  } else {
    post("/admin/paslon", data, {
      forceFormData: true,
      onSuccess: () => {
        onClose();
        onSuccess("add", `${data.ketua_nama} & ${data.wakil_nama}`);
      },
    });
  }
};


  const handleFileChange = (e) => {
    setData("foto", e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-600 bg-opacity-20 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(75, 85, 99, 0.2)" }}
        onClick={onClose}
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
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-4 text-purple-700">
            {isEditing ? "Edit Paslon" : "Tambah Paslon"}
          </h2>
          <h3 className="text-md font-semibold mb-2 text-purple-600">Data Ketua</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Input
                label="Nama"
                placeholder="Ex: John Doe"
                value={data.ketua_nama}
                onChange={(e) => setData("ketua_nama", e.target.value)}
              />
              {errors.ketua_nama && <div className="text-red-500 text-sm">{errors.ketua_nama}</div>}
            </div>
            <div>
              <Input
                label="NIS"
                placeholder="Ex: 234119221"
                value={data.ketua_nis}
                onChange={(e) => setData("ketua_nis", e.target.value)}
              />
              {errors.ketua_nis && <div className="text-red-500 text-sm">{errors.ketua_nis}</div>}
            </div>
            <div>
              <Input
                label="Kelas"
                placeholder="Ex: XII SIJA 1"
                value={data.ketua_kelas}
                onChange={(e) => setData("ketua_kelas", e.target.value)}
              />
              {errors.ketua_kelas && <div className="text-red-500 text-sm">{errors.ketua_kelas}</div>}
            </div>
          </div>

          <h3 className="text-md font-semibold mb-2 text-purple-600">Data Wakil</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Input
                label="Nama"
                placeholder="Ex: Jane Doe"
                value={data.wakil_nama}
                onChange={(e) => setData("wakil_nama", e.target.value)}
              />
              {errors.wakil_nama && <div className="text-red-500 text-sm">{errors.wakil_nama}</div>}
            </div>
            <div>
              <Input
                label="NIS"
                placeholder="Ex: 234119221"
                value={data.wakil_nis}
                onChange={(e) => setData("wakil_nis", e.target.value)}
              />
              {errors.wakil_nis && <div className="text-red-500 text-sm">{errors.wakil_nis}</div>}
            </div>
            <div>
              <Input
                label="Kelas"
                placeholder="Ex: XII SIJA 1"
                value={data.wakil_kelas}
                onChange={(e) => setData("wakil_kelas", e.target.value)}
              />
              {errors.wakil_kelas && <div className="text-red-500 text-sm">{errors.wakil_kelas}</div>}
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Input
                label="No. Paslon"
                placeholder="Ex: 1"
                value={data.no_paslon}
                onChange={(e) => setData("no_paslon", e.target.value)}
              />
              {errors.no_paslon && <div className="text-red-500 text-sm">{errors.no_paslon}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Foto</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-sm border rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-purple-300 file:text-purple-700 hover:file:bg-purple-400"
              />
              {errors.foto && <div className="text-red-500 text-sm">{errors.foto}</div>}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Visi</label>
            <textarea
              placeholder="Ex: Mewujudkan OSIS yang aktif, kreatif, dan berintegritas..."
              className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400"
              rows={3}
              value={data.visi}
              onChange={(e) => setData("visi", e.target.value)}
            />
            {errors.visi && <div className="text-red-500 text-sm">{errors.visi}</div>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Misi</label>
            <textarea
              placeholder={`Ex:\n1. Menumbuhkan semangat kebersamaan...\n2. Mengembangkan kegiatan positif...`}
              className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400"
              rows={4}
              value={data.misi}
              onChange={(e) => setData("misi", e.target.value)}
            />
            {errors.misi && <div className="text-red-500 text-sm">{errors.misi}</div>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={processing}>
              {isEditing ? "Simpan" : "Tambah"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}