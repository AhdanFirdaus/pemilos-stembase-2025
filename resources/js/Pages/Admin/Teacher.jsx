import { useState, useRef, useEffect } from "react";
import Wrapper from "../../Components/Layouts/Wrapper";
import Card from "../../Components/Elements/Card";
import Table from "../../Components/Elements/Table";
import Button from "../../Components/Elements/Button";
import SearchInput from "../../Components/Elements/SearchInput";
import { Eye, EyeOff, Upload, Download, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import FormGuru from "../../Components/Fragments/FormGuru";
import Alert from "../../Components/Elements/Alert";
import ActionMenu from "../../Components/Elements/ActionMenu";
import { router } from "@inertiajs/react";

export default function Teacher({ teachers, filters }) {
  const [openForm, setOpenForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const itemsPerPage = 10;

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      teachers.map((teacher) => {
        console.log("Mapping teachers:", teacher); // Debug: Inspect teachers structure
        return {
          id: teacher.id,
          nama: teacher.name || "",
          nip: teacher.identifier || "",
          pass: teacher.plain_password || "",
          status: teacher.status || "Belum",
          showPass: false,
        };
      })
    );
    setCurrentPage(1);
  }, [teachers]);

  const fileInputRef = useRef(null);

  const togglePassword = (id) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, showPass: !row.showPass } : row
      )
    );
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    router.get(
      window.location.pathname,
      { search: term },
      { replace: true, preserveState: true, preserveScroll: true }
    );
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("File guru yang dipilih:", file.name);

    const formData = new FormData();
    formData.append("file", file);

    router.post("/admin/guruimport", formData, {
      forceFormData: true,
      preserveState: false,
      onStart: () => {
        console.log("Upload mulai...");
      },
      onProgress: (progress) => {
        console.log("Progress:", progress); // bisa dipakai buat progress bar %
      },
      onSuccess: () => {
        console.log("Import berhasil");
        router.reload();
      },
      onError: (errors) => {
        console.error("Import gagal", errors);
      },
      onFinish: () => {
        console.log("Selesai");
      },
    });
  };

  const handleDeleteAll = () => {
    setShowAlert(false);
    setSuccessMessage("Semua data guru berhasil dihapus.");
    router.delete(`/admin/guruall`, {
      onSuccess: () => {
        router.reload();
      }
    });
    setShowSuccess(true);
  };

  const handleDeleteOne = (id, nama) => {
    setDeleteTarget(null);
    setShowAlert(false);
    router.delete(`/admin/guru/${id}`, {
      onSuccess: () => {
        setSuccessMessage(`Data ${nama} berhasil dihapus.`);
        setShowSuccess(true);
        router.reload();
      }
    });
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getPageNumbers = () => {
    const total = totalPages;
    const current = currentPage;
    const delta = 3;

    const pages = [1];

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    if (left > 2) {
      pages.push('...');
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < total - 1) {
      pages.push('...');
    }

    if (total > 1) {
      pages.push(total);
    }

    return pages;
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
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Sudah"
              ? "bg-green-100 text-green-600"
              : "bg-pink-100 text-pink-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Aksi",
      className: "w-16 text-right", // Enforce fixed width and right alignment
      render: (row) => (
        <div className="flex items-center justify-end w-16">
          <ActionMenu
            onEdit={() => {
              console.log("Editing data:", row); // Debug: Inspect row passed to FormGuru
              setEditingData(row);
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
        <h1 className="text-2xl font-bold">Data Guru</h1>
      </div>

      <Card className="p-6 flex flex-col bg-white">
        {/* Sub Header */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2 className="text-xl font-semibold">
              Semua Guru <span className="text-gray-500">{data.length}</span>
            </h2>
            <div className="flex flex-wrap gap-3 justify-end">
              <div>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button variant="green" onClick={handleImportClick} className="cursor-pointer">
                  <Upload size={16} className="mr-2" />
                  Impor
                </Button>
              </div>
              <Button
                className="cursor-pointer"
                variant="green"
                onClick={() => {
                  window.location.href = '/admin/guruexport'
                }}
              >
                <Download size={16} className="mr-2" />
                Ekspor
              </Button>
              <Button variant="red" onClick={() => setShowAlert(true)} className="cursor-pointer">
                <Trash2 size={16} className="mr-2" />
                Hapus Semua
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <SearchInput 
              placeholder="Cari" 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button
            className="cursor-pointer"
              variant="primary"
              onClick={() => {
                setEditingData(null);
                setOpenForm(true);
              }}
            >
              Tambah Guru
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
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
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`w-10 h-10 flex items-center cursor-pointer justify-center rounded-md border transition
                ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed grayscale"
                    : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
                }`}
            >
              <ChevronLeft size={18} />
            </button>
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={index} className="px-3 py-1 text-sm text-gray-500">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md cursor-pointer text-sm font-medium transition
                    ${
                      currentPage === page
                        ? "bg-[#C8B6FF] text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              )
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`w-10 h-10 flex cursor-pointer items-center justify-center rounded-md border transition
                ${
                  currentPage === totalPages
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
        <FormGuru
          type="guru"
          initialData={editingData}
          onClose={() => setOpenForm(false)}
          onSuccess={(action, nama) => {
            setSuccessMessage(
              action === "add"
                ? `Data ${nama} berhasil ditambahkan.`
                : `Data ${nama} berhasil diperbarui.`
            );
            setShowSuccess(true);
            router.reload();
          }}
        />
      )}

      {/* Alert Konfirmasi Hapus */}
      <Alert
        isOpen={showAlert}
        icon="warning"
        title={
          deleteTarget
            ? `Yakin ingin hapus ${deleteTarget.nama}?`
            : "Yakin ingin hapus semua?"
        }
        text={
          deleteTarget
            ? "Data guru yang dihapus tidak bisa dikembalikan."
            : "Semua data guru akan dihapus permanen."
        }
        confirmText="Ya, Hapus!"
        cancelText="Batal"
        showCancel={true}
        onConfirm={() =>
          deleteTarget
            ? handleDeleteOne(deleteTarget.id, deleteTarget.nama)
            : handleDeleteAll()
        }
        onCancel={() => {
          setShowAlert(false);
          setDeleteTarget(null);
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