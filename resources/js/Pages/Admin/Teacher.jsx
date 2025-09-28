// resources/js/Pages/Teacher.jsx
import { useState, useRef } from "react";
import Wrapper from "../../Components/Layouts/Wrapper";
import Card from "../../Components/Elements/Card";
import Table from "../../Components/Elements/Table";
import Button from "../../Components/Elements/Button";
import SearchInput from "../../Components/Elements/SearchInput";
import {
  MoreHorizontal,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2,
} from "lucide-react";
import FormUser from "../../Components/Fragments/FormUser";
import Alert from "../../Components/Elements/Alert";

export default function Teacher({ teachers = [] }) {
  const [openForm, setOpenForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);     // konfirmasi hapus
  const [showSuccess, setShowSuccess] = useState(false); // sukses hapus

  const [data, setData] = useState(
    teachers.map((teacher) => ({
      id: teacher.id,
      nama: teacher.name,
      nip: teacher.identifier,
      pass: teacher.password,
      status: teacher.status,
      showPass: false,
    }))
  );

  const fileInputRef = useRef(null);

  const togglePassword = (id) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, showPass: !row.showPass } : row
      )
    );
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // buka file picker
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File guru yang dipilih:", file.name);
      // TODO: parsing CSV/Excel dan masukkan ke state `data`
    }
  };

  const handleDeleteAll = () => {
    setData([]);             // hapus semua data
    setShowAlert(false);     // tutup alert konfirmasi
    setShowSuccess(true);    // tampilkan alert sukses
  };

  const columns = [
    { key: "id", header: "No" },
    { key: "nama", header: "Nama" },
    { key: "nip", header: "NIP" },
    {
      key: "pass",
      header: "Pass",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span>{row.showPass ? row.pass : "******"}</span>
          <button onClick={() => togglePassword(row.id)}>
            {row.showPass ? (
              <EyeOff size={16} className="text-gray-500" />
            ) : (
              <Eye size={16} className="text-gray-500" />
            )}
          </button>
        </div>
      ),
    },
    { key: "status", header: "Status" },
    { key: "action", header: "Aksi" },
  ];

  return (
    <Wrapper>
      {/* Header */}
      <div className="flex flex-col gap-6 mb-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Data Guru</h1>
      </div>

      <Card className="p-6">
        {/* Sub Header */}
        <div className="flex flex-col gap-4 mb-4">
          {/* Baris 1 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2 className="text-xl font-semibold">
              Semua Guru <span className="text-gray-500">{data.length}</span>
            </h2>
            <div className="flex flex-wrap gap-3 justify-end">
              {/* Impor */}
              <div>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button variant="green" onClick={handleImportClick}>
                  <Upload size={16} className="mr-2" />
                  Impor
                </Button>
              </div>

              {/* Ekspor */}
              <Button variant="green">
                <Download size={16} className="mr-2" />
                Ekspor
              </Button>

              {/* Hapus Semua */}
              <Button variant="red" onClick={() => setShowAlert(true)}>
                <Trash2 size={16} className="mr-2" />
                Hapus Semua
              </Button>
            </div>
          </div>

          {/* Baris 2 */}
          <div className="flex flex-wrap items-center justify-end gap-3">
            <SearchInput placeholder="Cari" />
            <Button variant="primary" onClick={() => setOpenForm(true)}>
              Tambah Guru
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            data={data}
            renderAction={(row) => (
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.status === "Sudah"
                      ? "bg-green-100 text-green-600"
                      : "bg-pink-100 text-pink-600"
                  }`}
                >
                  {row.status}
                </span>
                <button className="p-1 rounded hover:bg-gray-100">
                  <MoreHorizontal size={16} className="text-gray-500" />
                </button>
              </div>
            )}
          />
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-4">
          Menampilkan <b>{data.length}</b> dari <b>{data.length}</b> Hasil
        </p>
      </Card>

      {/* Modal Form Tambah Guru */}
      {openForm && <FormUser type="guru" onClose={() => setOpenForm(false)} />}

      {/* SweetAlert Konfirmasi */}
      <Alert
        isOpen={showAlert}
        icon="warning"
        title="Yakin ingin hapus semua?"
        text="Data guru yang dihapus tidak bisa dikembalikan."
        confirmText="Ya, Hapus!"
        cancelText="Batal"
        showCancel={true}
        onConfirm={handleDeleteAll}
        onCancel={() => setShowAlert(false)}
      />

      {/* SweetAlert Sukses */}
      <Alert
        isOpen={showSuccess}
        icon="success"
        title="Berhasil!"
        text="Semua data guru berhasil dihapus."
        confirmText="OK"
        onConfirm={() => setShowSuccess(false)}
      />
    </Wrapper>
  );
}
