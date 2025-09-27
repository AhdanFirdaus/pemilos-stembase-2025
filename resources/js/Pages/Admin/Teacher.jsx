import Wrapper from "../../Components/Layouts/Wrapper";
import Card from "../../Components/Elements/Card";
import Table from "../../Components/Elements/Table";
import Button from "../../Components/Elements/Button";
import SearchInput from "../../Components/Elements/SearchInput";
import { MoreHorizontal } from "lucide-react";

export default function Student() {
  const data = [
    { id: 1, nama: "Pak Budi", nip: "1987654321", mapel: "Matematika" },
    { id: 2, nama: "Bu Ani", nip: "1976543210", mapel: "Bahasa Indonesia" },
  ];

  const columns = [
    { key: "id", header: "No" },
    { key: "nama", header: "Nama" },
    { key: "nip", header: "NIP" },
    { key: "mapel", header: "Mapel" },
    { key: "action", header: "Aksi" },
  ];

  return (
    <Wrapper>
      <h1 className="text-2xl font-bold mb-6">Data Guru</h1>

      <Card className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <div className="flex gap-2">
            <Button variant="secondary">Impor</Button>
            <Button variant="secondary">Ekspor</Button>
            <Button variant="danger">Hapus Semua</Button>
          </div>

          <div className="flex items-center gap-3">
            <SearchInput placeholder="Cari" />
            <Button variant="primary">Tambah Guru</Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            data={data}
            renderAction={() => (
              <button className="p-1 rounded hover:bg-gray-100">
                <MoreHorizontal size={16} className="text-gray-500" />
              </button>
            )}
          />
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-4">
          Menampilkan <b>{data.length}</b> Hasil
        </p>
      </Card>
    </Wrapper>
  );
}
