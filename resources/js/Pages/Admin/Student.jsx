import { useState, useRef, useEffect } from "react";
import Wrapper from "../../Components/Layouts/Wrapper";
import Card from "../../Components/Elements/Card";
import Table from "../../Components/Elements/Table";
import Button from "../../Components/Elements/Button";
import SearchInput from "../../Components/Elements/SearchInput";
import { Eye, EyeOff, Upload, Download, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import FormSiswa from "../../Components/Fragments/FormSiswa";
import Alert from "../../Components/Elements/Alert";
import ActionMenu from "../../Components/Elements/ActionMenu";
import { router } from "@inertiajs/react";

export default function Student({ students, filters }) {
  const [openForm, setOpenForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData(
      students.data.map((student) => {
        console.log("Mapping students:", student); // Debug: Inspect students structure
        return {
          id: student.id,
          nama: student.name || "",
          kelas: student.kelas || "",
          nis: student.identifier || "",
          pass: student.plain_password || "",
          status: student.status || "Belum",
          showPass: false,
        };
      })
    );
  }, [students]);

  const fileInputRef = useRef(null);

  const togglePassword = (id) => {
    setCurrentData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, showPass: !row.showPass } : row
      )
    );
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    router.get(
      window.location.pathname,
      { search: term, page: 1 },
      { replace: true, preserveState: true, preserveScroll: true }
    );
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("File siswa yang dipilih:", file.name);

    const formData = new FormData();
    formData.append("file", file);

    router.post("/admin/siswaimport", formData, {
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
    setSuccessMessage("Semua data siswa berhasil dihapus.");
    router.delete('/admin/siswaall', {
      onSuccess: () => {
        router.reload();
      }
    });
    setShowSuccess(true);
  };

  const handleDeleteOne = (id, nama) => {
    setDeleteTarget(null);
    setShowAlert(false);
    router.delete(`/admin/siswa/${id}`, {
      onSuccess: () => {
        setSuccessMessage(`Data ${nama} berhasil dihapus.`);
        setShowSuccess(true);
        router.reload();
      }
    });
  };

  const getPageNumbers = () => {
    const total = students.last_page;
    const current = students.current_page;
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
              console.log("Editing data:", row); // Debug: Inspect row passed to FormSiswa
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
        <h1 className="text-2xl font-bold">Data Siswa</h1>
      </div>

      <Card className="p-6 flex flex-col bg-white">
        {/* Sub Header */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2 className="text-xl font-semibold">
              Semua Siswa <span className="text-gray-500">{students.total}</span>
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
                <Button variant="green" onClick={handleImportClick}>
                  <Upload size={16} className="mr-2" />
                  Impor
                </Button>
              </div>
              <Button 
                variant="green"
                onClick={() => {
                  window.location.href = '/admin/siswaexport'
                }}
              >
                <Download size={16} className="mr-2" />
                Ekspor
              </Button>
              <Button variant="red" onClick={() => setShowAlert(true)}>
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
              variant="primary"
              onClick={() => {
                setEditingData(null);
                setOpenForm(true);
              }}
            >
              Tambah Siswa
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
              {((students.current_page - 1) * students.per_page) + 1}-{Math.min(((students.current_page - 1) * students.per_page) + students.per_page, students.total)}
            </b>{" "}
            dari <b>{students.total}</b> hasil
          </p>
          <div className="flex gap-2 items-center">
            <button
              disabled={!students.prev_page_url}
              onClick={() => router.visit(students.prev_page_url, { preserveState: true })}
              className={`w-10 h-10 flex items-center justify-center rounded-md border transition
                ${
                  !students.prev_page_url
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
                  onClick={() => router.get(
                    window.location.pathname,
                    { page: page, search: searchTerm },
                    { preserveState: true, replace: true }
                  )}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition
                    ${
                      students.current_page === page
                        ? "bg-[#C8B6FF] text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              )
            ))}
            <button
              disabled={!students.next_page_url}
              onClick={() => router.visit(students.next_page_url, { preserveState: true })}
              className={`w-10 h-10 flex items-center justify-center rounded-md border transition
                ${
                  !students.next_page_url
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
        <FormSiswa
          type="siswa"
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
            ? "Data siswa yang dihapus tidak bisa dikembalikan."
            : "Semua data siswa akan dihapus permanen."
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