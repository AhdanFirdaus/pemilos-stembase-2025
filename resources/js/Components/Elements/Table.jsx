import React from "react";

export default function Table({ columns, data, renderAction }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#C8B6FF] text-white text-left">
          {columns.map((column, index) => (
            <th
              key={column.key}
              className={`px-4 py-2 ${column.className || ""}`}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            className="border-b last:border-b-0 hover:bg-purple-50"
          >
            {columns.map((column) => (
              <td key={`${row.id}-${column.key}`} className="px-4 py-2">
                {column.render
                  ? column.render(row)
                  : column.key === "action" && renderAction
                  ? renderAction(row)
                  : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}