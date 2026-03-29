import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  CreditCard,
  Clock,
  Check,
  MoreVertical,
  Menu,
} from "lucide-react";
import axios from "axios";

const AdminPaymentComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://pak-deals-backend.vercel.app/api/admin/user-transactions")
      .then((response) => {
        const mappedData = response.data.transactions.map((tx) => ({
          id: tx.transaction_id,
          user: `${tx.first_name} ${tx.last_name}`,
          email: tx.user_email,
          amount: parseFloat(tx.transaction_amount) || 0,
          date: new Date(tx.transaction_made_on).toLocaleDateString(),
          method: tx.transaction_method,
          status: tx.transaction_status === 0 ? "Pending" : "Approved",
          ad_id: tx.ad_id,
          ad_table: tx.ad_table,
          featured_days: tx.featured_days,
        }));
        setTransactions(mappedData);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const stats = useMemo(() => {
    const totalCount = transactions.length;
    const pending = transactions.filter((t) => t.status === "Pending").length;
    const approved = transactions.filter((t) => t.status === "Approved").length;
    const volume = transactions.reduce((sum, t) => sum + t.amount, 0);
    const rate = totalCount > 0 ? Math.round((approved / totalCount) * 100) : 0;
    return { pending, volume, rate };
  }, [transactions]);

  const filteredTransactions = transactions.filter((tx) => {
    const search = searchTerm.toLowerCase();
    return (
      tx.user.toLowerCase().includes(search) ||
      tx.email.toLowerCase().includes(search) ||
      tx.id.toString().includes(search)
    );
  });

  const chnageStatusToFeatured = (
    table_name,
    ad_id,
    transaction_id,
    featured_days,
  ) => {
    // -------------------- CHANGE PAYMENT STATUS TO COMPLETED --------------------
    axios
      .put(
        `https://pak-deals-backend.vercel.app/api/admin/approve-transaction/${transaction_id}`,
      )
      .then((response) => {
        console.log("Transaction Approved:", response.data);

        setTransactions((prev) =>
          prev.map((item) =>
            item.id === transaction_id ? { ...item, status: "Approved" } : item,
          ),
        );

        // -------------------- CHANGE AD STATUS TO FEATURED --------------------
        axios
          .put(
            `https://pak-deals-backend.vercel.app/api/status/featured/${table_name}/${ad_id}`,
            { featured_days: featured_days },
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      {/* RESPONSIVE NAV */}
      <nav className="border-b border-gray-100 px-4 md:px-8 py-4 bg-white sticky top-0 z-20">
        <div className="container flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <CreditCard size={18} className="text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">PayGuard</span>
            </div>
            <Menu
              className="md:hidden text-gray-400 cursor-pointer"
              size={24}
            />
          </div>
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Payment Management
          </h1>
          <p className="text-gray-500">
            Review and approve financial movements.
          </p>
        </header>

        {/* RESPONSIVE STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
          <StatCard
            label="Pending Approval"
            value={stats.pending}
            icon={<Clock className="text-blue-600" />}
          />
          <StatCard
            label="Total Volume"
            value={`$${stats.volume.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            icon={<CreditCard className="text-blue-600" />}
          />
          <StatCard
            label="Completion Rate"
            value={`${stats.rate}%`}
            icon={<CheckCircle className="text-blue-600" />}
          />
        </div>

        {/* RESPONSIVE TABLE CONTAINER */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* 1. Hide header on mobile, show as table-group on desktop */}
              <thead className="hidden md:table-header-group">
                <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs uppercase tracking-widest font-semibold">
                  <th className="px-6 py-4">Transaction Details</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              {/* 2. Body behaves as a standard group on desktop, but simple block on mobile */}
              <tbody className="divide-y divide-gray-50 block md:table-row-group">
                {loading ? (
                  <LoadingSkeleton />
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="group hover:bg-blue-50/30 transition-colors flex flex-col md:table-row p-6 md:p-0"
                    >
                      {/* Transaction Details */}
                      <td className="md:px-6 md:py-5 mb-3 md:mb-0">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-lg md:text-base">
                            {tx.user}
                          </span>
                          <span className="text-xs text-gray-400 font-mono uppercase">
                            #TXN-{tx.id} • {tx.email}
                          </span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="md:px-6 md:py-5 font-semibold text-gray-900 flex items-center md:table-cell mb-2 md:mb-0">
                        <span className="md:hidden text-gray-400 text-xs uppercase mr-auto font-normal">
                          Amount
                        </span>
                        <span className="text-lg md:text-base">
                          ${tx.amount.toFixed(2)}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="md:px-6 md:py-5 text-gray-500 text-sm flex items-center md:table-cell mb-4 md:mb-0">
                        <span className="md:hidden text-gray-400 text-xs uppercase mr-auto font-normal">
                          Date
                        </span>
                        {tx.date}
                      </td>

                      {/* Status */}
                      <td className="md:px-6 md:py-5 flex items-center md:table-cell mb-6 md:mb-0">
                        <span className="md:hidden text-gray-400 text-xs uppercase mr-auto font-normal">
                          Status
                        </span>
                        <StatusBadge status={tx.status} />
                      </td>

                      {/* Actions */}
                      <td className="md:px-6 md:py-5 md:text-right border-t border-gray-50 pt-4 md:pt-0 md:border-none">
                        {tx.status === "Pending" ? (
                          <div className="flex gap-3 md:justify-end">
                            <button
                              onClick={() => updateStatus(tx.id, "Rejected")}
                              className="flex-1 md:flex-none flex items-center justify-center gap-2 p-2.5 text-gray-500 hover:text-red-600 border border-gray-200 md:border-none rounded-xl transition-all"
                            >
                              <XCircle size={20} />
                              <span className="md:hidden font-medium">
                                Reject
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                chnageStatusToFeatured(
                                  tx.ad_table,
                                  tx.ad_id,
                                  tx.id,
                                  tx.featured_days,
                                );
                              }}
                              className="flex-2 md:flex-none bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-sm"
                            >
                              <Check size={18} />
                              Approve
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end">
                            <button className="p-2 text-gray-300 hover:text-gray-600 transition-colors">
                              <MoreVertical size={20} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components (unchanged styles, just keeping logic)
const StatCard = ({ label, value, icon }) => (
  <div className="bg-white border border-gray-100 p-6 rounded-2xl flex items-center justify-between shadow-sm hover:border-blue-100 transition-colors">
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-black">{value}</p>
    </div>
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
      {icon}
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Approved: "bg-blue-50 text-blue-700 ring-1 ring-blue-700/10",
    Pending: "bg-gray-100 text-gray-600 ring-1 ring-gray-600/10",
    Rejected: "bg-red-50 text-red-600 ring-1 ring-red-600/10",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const LoadingSkeleton = () =>
  [...Array(3)].map((_, i) => (
    <tr key={i} className="animate-pulse flex flex-col md:table-row px-6 py-8">
      <td
        colSpan="5"
        className="px-6 py-8 bg-gray-50/50 border-b border-white"
      ></td>
    </tr>
  ));

export default AdminPaymentComponent;
