import { useState } from "react";
import Wrapper from "../../Components/Layouts/Wrapper";
import Card from "../../Components/Elements/Card";
import { MoreHorizontal } from "lucide-react";
import Button from "../../Components/Elements/Button";
import SearchInput from "../../Components/Elements/SearchInput";
import Table from "../../Components/Elements/Table"; // Import Table component
import Form from "../../Components/Fragments/FormPaslon";

export default function Paslon({ pairCandidates }) {
  const [openForm, setOpenForm] = useState(false);

  const data = pairCandidates.map((pair) => ({
    id: pair.pair_number,
    ketua: pair.ketua,
    wakil: pair.wakil,
  }));

  const columns = [
    { key: "id", header: "Nomor Paslon", className: "rounded-tl-lg" },
    { key: "ketua", header: "Ketua OSIS" },
    { key: "wakil", header: "Wakil OSIS" },
    { key: "action", header: "Aksi", className: "rounded-tr-lg" },
  ];

  const renderAction = (row) => (
    <button className="p-1 rounded hover:bg-gray-100">
      <MoreHorizontal size={18} className="text-gray-500" />
    </button>
  );

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
          <Table
            columns={columns}
            data={data}
            renderAction={renderAction}
          />
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