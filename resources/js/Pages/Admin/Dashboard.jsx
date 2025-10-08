import { useState } from "react";
import Wrapper from "../../Components/Layouts/Wrapper";
import Card from "../../Components/Elements/Card";
import Dropdown from "../../Components/Elements/Dropdown";
import { Users, UserCheck, UserX } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ total, guru, siswa, pieData, barData }) {
  const [filter, setFilter] = useState("Semua");

  return (
    <Wrapper>
      {/* Header Ringkasan */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ringkasan</h1>

        <Dropdown
          label="Filter"
          options={["Semua", "Siswa", "Guru"]}
          value={filter}
          onChange={setFilter}
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#C8B6FF] flex flex-col items-center justify-center text-white">
          <UserCheck size={32} className="mb-2 text-[#7D52FF]" />
          <p className="text-3xl font-bold">{total.voted}</p>
          <span className="text-lg">Selesai</span>
        </Card>

        <Card className="bg-[#F8B4D9] flex flex-col items-center justify-center text-white">
          <UserX size={32} className="mb-2 text-[#FF008B]" />
          <p className="text-3xl font-bold">{total.not_voted}</p>
          <span className="text-lg">Belum</span>
        </Card>

        <Card className="bg-[#FFD6A5] flex flex-col items-center justify-center text-white">
          <Users size={32} className="mb-2 text-[#E4B200]" />
          <p className="text-3xl font-bold">{total.total}</p>
          <span className="text-lg">Total</span>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Perolehan Data</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#C8B6FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Data Pemilih</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Wrapper>
  );
}
