// resources/js/Components/Layouts/Wrapper.jsx
import Sidebar from "../Fragments/Sidebar";

export default function Wrapper({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-[#F6F6F6] min-h-screen p-6">{children}</main>
    </div>
  );
}
