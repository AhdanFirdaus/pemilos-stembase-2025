import Card from "../Elements/Card"; // sesuaikan path nya
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

export default function Dashboard() {
  const barData = [
    { name: "Paslon 1", value: 40 },
    { name: "Paslon 2", value: 70 },
    { name: "Paslon 3", value: 110 },
  ];

  const pieData = [
    { name: "Sudah", value: 70, color: "#A3E4D7" },
    { name: "Belum", value: 30, color: "#F5B7B1" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ringkasan</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-purple-200 flex flex-col items-center justify-center">
          <UserCheck size={32} className="mb-2 text-purple-700" />
          <p className="text-3xl font-bold">20</p>
          <span className="text-lg">Selesai</span>
        </Card>

        <Card className="bg-pink-200 flex flex-col items-center justify-center">
          <UserX size={32} className="mb-2 text-pink-700" />
          <p className="text-3xl font-bold">10</p>
          <span className="text-lg">Belum</span>
        </Card>

        <Card className="bg-yellow-200 flex flex-col items-center justify-center">
          <Users size={32} className="mb-2 text-yellow-700" />
          <p className="text-3xl font-bold">30</p>
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
              <Bar dataKey="value" fill="#B388EB" radius={[8, 8, 0, 0]} />
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
    </div>
  );
}
