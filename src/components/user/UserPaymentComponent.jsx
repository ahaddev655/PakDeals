import { Search, ChevronDown, Filter, CreditCard } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserPaymentComponent() {
  const [selectedSort, setSelectedSort] = useState("by-date");
  const [sortDropdownToggle, setSortDropdownToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sortTabs = [
    { key: "by-date", label: "Latest First" },
    { key: "by-amount", label: "Highest Amount" },
    { key: "by-type", label: "Payment Type" },
  ];

  const [payments, setPayments] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`https://pak-deals-backend.vercel.app/api/users/transactions/${userId}`)
      .then((response) => {
        console.log(response.data);
        toast.success(response?.data?.message);
        setPayments(response.data.transactions);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "");
      });
  }, []);

  const filteredAndSortedPayments = payments
    .filter((p) => {
      const searchTerm = searchQuery.toLowerCase();
      const method = (p.transaction_method || "").toLowerCase();
      const id = p.transaction_id?.toString() || "";

      return method.includes(searchTerm) || id.includes(searchTerm);
    })
    .sort((a, b) => {
      if (selectedSort === "by-date") {
        return (
          new Date(b.transaction_made_on) - new Date(a.transaction_made_on)
        );
      }
      if (selectedSort === "by-amount") {
        return Number(b.transaction_amount) - Number(a.transaction_amount);
      }
      if (selectedSort === "by-type") {
        return (a.transaction_method || "").localeCompare(
          b.transaction_method || "",
        );
      }
      return 0;
    });

  const getStatusStyle = (status) => {
    switch (status) {
      case 1:
        return "bg-green-100 text-green-700 border-green-200";
      case 0:
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* HEADER SECTION */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Payment History
          </h2>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">
            Transaction Logs
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* SEARCH */}
          <div className="relative flex-1 md:flex-none">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Filter transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 transition-all"
            />
          </div>

          {/* SORT DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setSortDropdownToggle(!sortDropdownToggle)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <Filter size={16} />
              {sortTabs.find((s) => s.key === selectedSort)?.label}
              <ChevronDown
                size={16}
                className={`transition-transform ${sortDropdownToggle ? "rotate-180" : ""}`}
              />
            </button>

            {sortDropdownToggle && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSortDropdownToggle(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-xl p-2 z-20 animate-in fade-in zoom-in duration-200">
                  {sortTabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${selectedSort === tab.key ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-50"}`}
                      onClick={() => {
                        setSelectedSort(tab.key);
                        setSortDropdownToggle(false);
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto">
        {filteredAndSortedPayments.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                {["Transaction ID", "Method", "Amount", "Status", "Date"].map(
                  (head) => (
                    <th
                      key={head}
                      className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100"
                    >
                      {head}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAndSortedPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-4 text-sm font-black text-blue-600">
                    #{payment.transaction_id.toString().padStart(4, "0")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white transition-colors">
                        <CreditCard size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">
                        {payment.transaction_method}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-900">
                      Rs {Number(payment.transaction_amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(payment.transaction_status)}`}
                    >
                      {payment.transaction_status ? "completed" : "processing"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-500">
                    {payment.transaction_made_on
                      .slice(5, 16)
                      .replaceAll(" ", "/")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-slate-900 font-black">No transactions found</h3>
            <p className="text-slate-400 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPaymentComponent;
