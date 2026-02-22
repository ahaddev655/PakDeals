import { Search } from "lucide-react";
import React, { useState } from "react";

function UserPaymentComponent() {
  // ==================== SORT DROPDOWN JS ====================
  const [selectedSort, setSelectedSort] = useState("by-amount");
  const [sortDropdownToggle, setSortDropdownToggle] = useState(false);
  const sortTabs = [
    { key: "by-date", label: "Sort By Date" },
    { key: "by-amount", label: "Sort By Amount" },
  ];
  // ==================== PAYMENT JS ====================
  const [payments, setPayments] = useState([
    {
      id: 1,
      type: "Direct Bank Transfer",
      amount: "200000",
      date: "2/01/2010",
    },
    {
      id: 2,
      type: "EasyPaisa Transfer",
      amount: "100000",
      date: "2/01/2009",
    },
  ]);
  // ==================== SEARCH QUERY JS ====================
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="sm:px-6 px-2.5 py-6 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* ==================== PAYMENTS HEADER ==================== */}
      <div className="flex items-center justify-between gap-3.5">
        {/* -------------------- SEARCHBAR -------------------- */}
        <div className="relative">
          <Search className="absolute text-[#7f7f7f] top-2 left-2" />
          <input
            type="text"
            placeholder="Search Payment Type"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-gray-200 rounded-md p-2 text-[15px] pl-10"
          />
        </div>
        {/* -------------------- SORT DROPDOWN -------------------- */}
        <div className="relative sm:mt-0 mt-4">
          <button
            onClick={() => setSortDropdownToggle(!sortDropdownToggle)}
            className="py-2 px-4 border border-gray-200 focus:border-blue-700 rounded-md bg-white shadow-sm w-41.5"
          >
            {sortTabs.find((s) => s.key === selectedSort)?.label || "Sort"}
          </button>
          <div
            className={`absolute top-full mt-2 left-0 w-40 bg-white shadow-lg border border-gray-200 p-1 rounded-md transition-all duration-300 origin-top transform ${
              sortDropdownToggle
                ? "scale-y-100 opacity-100"
                : "scale-y-0 opacity-0"
            }`}
          >
            {sortTabs.map((sort, i) => (
              <div
                key={i}
                className="cursor-pointer p-2 hover:bg-blue-50 rounded-md hover:text-blue-700"
                onClick={() => {
                  setSelectedSort(sort.key);
                  setSortDropdownToggle(false);
                }}
              >
                {sort.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ==================== PAYMENTS CONTAINER ==================== */}
      <div>
        {payments.length > 0 ? (
          <div className="overflow-x-auto mt-3">
            <table className="w-full">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  {["ID", "Type", "Amount", "Date"].map((h, i) => (
                    <th
                      key={i}
                      className={`font-semibold text-[#495057] py-3 px-6 ${
                        i < 3 ? "text-start" : "text-center"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments
                  .filter((payment) =>
                    payment.type
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                  )
                  .sort((a, b) => {
                    if (selectedSort === "by-status") {
                      return a.status.localeCompare(b.status);
                    }
                    if (selectedSort === "by-date") {
                      return (
                        new Date(a.date).getFullYear() -
                        new Date(b.date).getFullYear()
                      );
                    } else {
                      return Number(b.amount) - Number(a.amount);
                    }
                  })
                  .map((payment, i, arr) => (
                    <tr
                      key={payment.id}
                      className={`border-b hover:bg-gray-100 transition-colors ease-in-out duration-200 ${
                        i === arr.length - 1
                          ? "border-transparent"
                          : "border-gray-300"
                      }`}
                    >
                      <td className="py-4 px-6 text-[15px] text-gray-700 font-semibold">
                        #{payment.id}
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700">
                        {payment.type}
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700">
                        PKR {Number(payment.amount).toLocaleString()}
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700 text-center">
                        {payment.date}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-sm text-gray-700 py-3">
            No payments available
          </p>
        )}
      </div>
    </div>
  );
}

export default UserPaymentComponent;
