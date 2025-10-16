import { useState } from "react";
import Wrapper from "../../Components/Layouts/Wrapper";
import Card from "../../Components/Elements/Card";
import Table from "../../Components/Elements/Table";
import Button from "../../Components/Elements/Button";
import SearchInput from "../../Components/Elements/SearchInput";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FormPaslon from "../../Components/Fragments/FormPaslon";
import Alert from "../../Components/Elements/Alert";
import ActionMenu from "../../Components/Elements/ActionMenu";

export default function Paslon({ pairCandidates = [] }) {
  const [openForm, setOpenForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [data, setData] = useState(
    pairCandidates.map((pair) => {
      console.log("Mapping pairCandidates:", pair); // Debug: Inspect pairCandidates structure
      return {
        id: pair.id,
        no_paslon: String(pair.pair_number), // Convert to string to ensure compatibility
        ketua: pair.ketua,
        wakil: pair.wakil,
        ketua_nama: pair.ketua_nama || "",
        ketua_nis: pair.ketua_nis || "",
        ketua_kelas: pair.ketua_kelas || "",
        wakil_nama: pair.wakil_nama || "",
        wakil_nis: pair.wakil_nis || "",
        wakil_kelas: pair.wakil_kelas || "",
        visi: pair.visi || "",
        misi: pair.misi || "",
      };
    })
  );

  const handleDeleteOne = (id, ketua_nama, wakil_nama) => {
    setData((prev) => prev.filter((row) => row.id !== id));
    setDeleteTarget(null);
    setShowAlert(false);
    router.delete(`/admin/paslon/${id}`)
    setSuccessMessage(`Data paslon ${ketua_nama} & ${wakil_nama} berhasil dihapus.`);
    setShowSuccess(true);
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const columns = [
    { key: "no_paslon", header: "Nomor Paslon" },
    { key: "ketua", header: "Ketua OSIS" },
    { key: "wakil", header: "Wakil OSIS" },
    {
      key: "action",
      header: "Aksi",
      className: "w-16 text-right", // Enforce fixed width and right alignment
      render: (row) => (
        <div className="flex items-center justify-end w-16">
          <ActionMenu
            onEdit={() => {
              console.log("Editing data:", row); // Debug
              console.log("pairCandidates?", pairCandidates);

              // Find the candidate whose pair_number matches row.id
              const matchedCandidate = pairCandidates.find(
                (candidate) => candidate.pair_number === String(row.id) // convert to string since pair_number is a string
              );

              if (matchedCandidate) {
                console.log("Matched Candidate:", matchedCandidate);
                setEditingData(matchedCandidate);
              } else {
                console.warn("No candidate found for row.id:", row.id);
                setEditingData(row); // fallback
              }

              setOpenForm(true);
            }}

            onDelete={() => {
              setDeleteTarget(row);
              setShowAlert(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
      {/* Header */}
      <div className="flex flex-col gap-6 mb-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Data Paslon</h1>
      </div>

      <Card className="p-6 flex flex-col bg-white">
        {/* Sub Header */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2 className="text-xl font-semibold">
              Semua Paslon <span className="text-gray-500">{data.length}</span>
            </h2>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <SearchInput placeholder="Cari" />
              <Button
                variant="primary"
                onClick={() => {
                  setEditingData(null);
                  setOpenForm(true);
                }}
              >
                Tambah Paslon
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full">
          <Table columns={columns} data={currentData} />
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Menampilkan{" "}
            <b>
              {indexOfFirst + 1}-{Math.min(indexOfLast, data.length)}
            </b>{" "}
            dari <b>{data.length}</b> hasil
          </p>
          <div className="flex gap-2 items-center">
            <button
              disabled={currentPage === 1 || data.length < 10}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-md border transition
                ${currentPage === 1 || data.length < 10
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed grayscale"
                  : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
                }`}
            >
              <ChevronLeft size={18} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition
                  ${currentPage === i + 1
                    ? "bg-[#C8B6FF] text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages || data.length < 10}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-md border transition
                ${currentPage === totalPages || data.length < 10
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed grayscale"
                  : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
                }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Card>

      {/* Modal Form */}
      {openForm && (
        <FormPaslon
          initialData={editingData}
          onClose={() => setOpenForm(false)}
          onSuccess={(action, name) => {
            setSuccessMessage(
              action === "add"
                ? `Data paslon ${name} berhasil ditambahkan.`
                : `Data paslon ${name} berhasil diperbarui.`
            );
            setShowSuccess(true);
            console.log("tess")
          }}
        />
      )}

      {/* Alert Konfirmasi Hapus */}
      <Alert
        isOpen={showAlert}
        icon="warning"
        title={`Yakin ingin hapus paslon ${deleteTarget?.ketua_nama} & ${deleteTarget?.wakil_nama}?`}
        text="Data paslon yang dihapus tidak bisa dikembalikan."
        confirmText="Ya, Hapus!"
        cancelText="Batal"
        showCancel={true}
        onConfirm={() =>
          handleDeleteOne(deleteTarget.id, deleteTarget.ketua_nama, deleteTarget.wakil_nama)
        }
        onCancel={() => {
          setDeleteTarget(null);
          setShowAlert(false);
        }}
      />

      {/* Alert Sukses */}
      <Alert
        isOpen={showSuccess}
        icon="success"
        title="Berhasil!"
        text={successMessage}
        confirmText="OK"
        onConfirm={() => setShowSuccess(false)}
      />
    </Wrapper>
  );
}