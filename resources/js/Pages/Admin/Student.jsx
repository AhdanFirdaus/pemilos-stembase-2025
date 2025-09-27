import { useState } from "react";
import Wrapper from "../../Components/Layouts/Wrapper";
import Card from "../../Components/Elements/Card";
import Table from "../../Components/Elements/Table";
import Button from "../../Components/Elements/Button";
import SearchInput from "../../Components/Elements/SearchInput";
import { MoreHorizontal, Eye, EyeOff, Upload, Download, Trash2 } from "lucide-react";
import FormUser from "../../Components/Fragments/FormUser";

export default function Student({ students }) {
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState(
  students.map((student) => ({
    id: student.id,
    nama: student.name,
    kelas: student.kelas,
    nis: student.identifier,
    pass: student.password,
    status: student.status,
    showPass: false,
  }))
);  

  const togglePassword = (id) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, showPass: !row.showPass } : row
      )
    );
  };

  const columns = [
    { key: "id", header: "No" },
    { key: "nama", header: "Nama" },
    { key: "kelas", header: "Kelas" },
    { key: "nis", header: "NIS" },
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
        <h1 className="text-2xl font-bold">Data Siswa</h1>
      </div>

      <Card className="p-6">
        {/* Sub Header */}
        <div className="flex flex-col gap-4 mb-4">
          {/* Baris 1 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2 className="text-xl font-semibold">
              Semua Siswa <span className="text-gray-500">{data.length}</span>
            </h2>
            <div className="flex flex-wrap gap-3 justify-end">
              <Button variant="green">
                <Upload size={16} className="mr-2" />
                Impor
              </Button>
              <Button variant="green">
                <Download size={16} className="mr-2" />
                Ekspor
              </Button>
              <Button variant="red">
                <Trash2 size={16} className="mr-2" />
                Hapus Semua
              </Button>
            </div>
          </div>

          {/* Baris 2 */}
          <div className="flex flex-wrap items-center justify-end gap-3">
            <SearchInput placeholder="Cari" />
            <Button variant="primary" onClick={() => setOpenForm(true)}>
              Tambah Siswa
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

      {/* Modal Form Tambah Siswa */}
      {openForm && (
        <FormUser
          type="siswa"
          onClose={() => setOpenForm(false)}
        />
      )}
    </Wrapper>
  );
}
