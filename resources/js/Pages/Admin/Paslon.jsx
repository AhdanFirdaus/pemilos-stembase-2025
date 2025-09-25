import { useState } from "react";
import Wrapper from "../../Components/Layouts/Wrapper";
import Card from "../../Components/Elements/Card";
import { MoreHorizontal } from "lucide-react";
import Form from "../../Components/Fragments/Form";
import Button from "../../Components/Elements/Button";
import SearchInput from "../../Components/Elements/Search";

export default function Paslon() {
  const [openForm, setOpenForm] = useState(false);

  const data = [
    { id: 1, ketua: "John Doe", wakil: "Jane Doe" },
    { id: 2, ketua: "John Doe", wakil: "Jane Doe" },
    { id: 3, ketua: "John Doe", wakil: "Jane Doe" },
  ];

  return (
    <Wrapper>
      {/* Judul Halaman */}
      <h1 className="text-2xl font-bold mb-4">Paslon</h1>

      <Card className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Semua Paslon <span className="text-gray-500">{data.length}</span>
          </h2>
          <div className="flex items-center gap-3">
            {/* Search */}
            <SearchInput placeholder="Cari" />

            {/* Tambah Paslon */}
            <Button
              variant="primary"
              onClick={() => setOpenForm(true)}
            >
              Tambah Paslon
            </Button>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#C8B6FF] text-white text-left">
                <th className="px-4 py-2 rounded-tl-lg">Nomor Paslon</th>
                <th className="px-4 py-2">Ketua OSIS</th>
                <th className="px-4 py-2">Wakil OSIS</th>
                <th className="px-4 py-2 rounded-tr-lg">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b last:border-b-0 hover:bg-purple-50"
                >
                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.ketua}</td>
                  <td className="px-4 py-2">{row.wakil}</td>
                  <td className="px-4 py-2">
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal size={18} className="text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-4">
          Menampilkan <b>{data.length}</b> Hasil
        </p>
      </Card>

      {/* Modal Form */}
      {openForm && <Form onClose={() => setOpenForm(false)} />}
    </Wrapper>
  );
}